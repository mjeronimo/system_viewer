import type {MessageEvent} from '@foxglove/studio'
import {PanelExtensionContext, RenderState} from '@foxglove/studio'
import {CSSProperties, useEffect, useLayoutEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {ReactFlowProvider} from 'react-flow-renderer'
import processNodeEventMessageEvent from './process-node-message-event'
import {SystemViewer} from './SystemViewer'
import toGraph from './to-graph'
import {getFramesBeforeTime, getTimeFromNumber} from './utils/time'
import type {Node, PubSub} from './__types__/RosEntities'
import type RosStdMsgString from './__types__/RosStdMsgsString'
import type Statistics from './__types__/Statistics'

//import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
//import helpContent from "./index.help.md";

const scrollableDiv: CSSProperties = {overflowY: 'auto'}
const displayStyle: CSSProperties = {display: 'block', whiteSpace: 'pre-wrap'}

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
      <ReactFlowProvider>
        <SystemViewer />
      </ReactFlowProvider>

      <div style={scrollableDiv}>
        <h1>System Viewer</h1>
        <h2>Nodes</h2>
        <ul>
          {nodes.map((node) => (
            <li key={node.name}>
              {node.name}
              <br />
              Publishers:
              <ul>
                {node.publisherIds.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
              Subscribers:
              <ul>
                {node.subscriptionIds.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <h2>Publishers</h2>
        <ul>
          {publishers.map((pub) => (
            <li key={pub.id}>{pub.id}</li>
          ))}
        </ul>
        <h2>Subscriptions</h2>
        <ul>
          {subscriptions.map((sub) => (
            <li key={sub.id}>{sub.id}</li>
          ))}
        </ul>
        <h2>Output</h2>
        <code style={displayStyle}>
          {JSON.stringify(toGraph(nodes, publishers, subscriptions), null, 2)}
        </code>
      </div>
    </>
  )
}

function handleStatisticsMessage(msg: Statistics) {
  console.info('message on statistics topic: ', msg)
}

export function initSystemViewerPanel(context: PanelExtensionContext) {
  ReactDOM.render(<SystemViewerPanel context={context} />, context.panelElement)
}
