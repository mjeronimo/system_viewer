import type {MessageEvent} from '@foxglove/studio'
import {PanelExtensionContext, RenderState} from '@foxglove/studio'
//import {CSSProperties, useEffect, useLayoutEffect, useState} from 'react'
import {useEffect, useLayoutEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {ReactFlowProvider} from 'react-flow-renderer'
import processNodeEventMessageEvent from './process-node-message-event'
import {SystemViewer} from './SystemViewer'
//import toGraph from './to-graph'
import {getFramesBeforeTime, getTimeFromNumber} from './utils/time'
import type {Node, PubSub} from './__types__/RosEntities'
import type RosStdMsgString from './__types__/RosStdMsgsString'
import type Statistics from './__types__/Statistics'

//import PanelToolbar from "@foxglove/studio-base/src/components/PanelToolbar";
//import helpContent from "./index.help.md";

const MyReactFlowProvider: React.VoidFunctionComponent = () => {
  console.log('MyReactFlowProvider')
  // @ ts-ignore
  return (
    <ReactFlowProvider>
      {' '}
      <SystemViewer />{' '}
    </ReactFlowProvider>
  )
}

function SystemViewerPanel({context}: {context: PanelExtensionContext}): JSX.Element {
  const [renderDone, setRenderDone] = useState<(() => void) | undefined>()
  const [nodes, setNodes] = useState<Node[]>([])
  const [publishers, setPublishers] = useState<PubSub[]>([])
  const [subscriptions, setSubscriptions] = useState<PubSub[]>([])

  const nodeEventsTopic = '/system_viewer/node_events'
  const statisticsTopic = '/system_viewer/statistics'

  function processFramesForNodeEvents(
    frames: readonly MessageEvent<unknown>[],
    nodes: Node[],
    publishers: PubSub[],
    subscriptions: PubSub[],
  ) {
    frames.forEach((frame) => {
      if (frame.topic === nodeEventsTopic) {
        const out = processNodeEventMessageEvent(frame, nodes, publishers, subscriptions)
        nodes = out.nodes
        publishers = out.publishers
        subscriptions = out.subscriptions
      }
    })
    // Copy to trigger a re-render in React
    setNodes([...nodes])
    setPublishers([...publishers])
    setSubscriptions([...subscriptions])
  }

  function processFramesForStatistics(frames: readonly MessageEvent<unknown>[]) {
    frames.forEach((frame) => {
      if (frame.topic === statisticsTopic) {
        const messageEvent = frame as MessageEvent<RosStdMsgString>
        const msg = JSON.parse(messageEvent.message.data)
        handleStatisticsMessage(msg)
      }
    })
  }

  useLayoutEffect(() => {
    context.onRender = (renderState: RenderState, done) => {
      setRenderDone(done)

      if (renderState.previewTime && context.seekPlayback) {
        context.seekPlayback(renderState.previewTime)
        const timeObject = getTimeFromNumber(renderState.previewTime)
        const frames = getFramesBeforeTime(renderState.allFrames, timeObject)
        processFramesForNodeEvents(frames, [], [], [])
        processFramesForStatistics(frames)
      } else if (renderState.currentFrame && renderState.currentFrame.length > 0) {
        const currentFrames = renderState.currentFrame
        processFramesForNodeEvents(currentFrames, nodes, publishers, subscriptions)
        processFramesForStatistics(currentFrames)
      }
    }

    context.watch('currentFrame')
    context.watch('allFrames')
    context.watch('previewTime')
    context.subscribe([nodeEventsTopic, statisticsTopic])
  }, [])

  useEffect(() => {
    renderDone?.()
  }, [renderDone])

  return (
    <>
      <MyReactFlowProvider />
    </>
  )
}

function handleStatisticsMessage(msg: Statistics) {
  console.info('message on statistics topic: ', msg)
}

export function initSystemViewerPanel(context: PanelExtensionContext) {
  ReactDOM.render(<SystemViewerPanel context={context} />, context.panelElement)
}
