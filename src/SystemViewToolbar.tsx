// Copyright 2022 Open Source Robotics Foundation, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, {CSSProperties, useState} from 'react'
import {Elements} from 'react-flow-renderer'
import FitviewIcon from 'react-svg-loader!./assets/icons/fitview.svg'
import ArrowLeftRightIcon from 'react-svg-loader!@mdi/svg/svg/arrow-left-right.svg'
import ArrowUpDownIcon from 'react-svg-loader!@mdi/svg/svg/arrow-up-down.svg'
import SelectionIcon from 'react-svg-loader!@mdi/svg/svg/checkbox-multiple-marked-outline.svg'
import NodeGraphIcon from 'react-svg-loader!@mdi/svg/svg/graph.svg'
import MinusIcon from 'react-svg-loader!@mdi/svg/svg/minus.svg'
import PlusIcon from 'react-svg-loader!@mdi/svg/svg/plus.svg'
import Button from './foxglove/Button'
import Checkbox from './foxglove/Checkbox'
import ExpandingToolbar, {ToolGroup} from './foxglove/ExpandingToolbar'
import Icon from './foxglove/Icon'
import SegmentedControl, {Option} from './foxglove/SegmentedControl'
import styles from './foxglove/sharedStyles'
import {INodeListItem, NodeList} from './NodeList'
import Toolbar from './Toolbar'
import {isRosNode} from './utils/utils'

/* eslint-disable */

export type Props = {
  elements: Elements
  lrOrientation: boolean
  onZoomIn?: () => void
  onZoomOut?: () => void
  onFitview?: () => void
  onLayoutGraph?: (lrOrientation: boolean) => void
  onToggleOrientation?: (lrOrientation: boolean) => void
  onSelectionChange: (selectedNodes: string[]) => void
}

const toolbarStyles: CSSProperties = {width: '325px'}
const iconStyles: CSSProperties = {color: 'white'}

export const SystemViewToolbar: React.FC<Props> = (props: Props) => {
  let defaultSelectedTab: string | undefined

  const GroupingOptions = {
    first: {id: 'logical', label: 'Logical'},
    second: {id: 'physical', label: 'Physical'},
    third: {id: 'none', label: 'None'},
  }
  const optionArray: Option[] = Object.values(GroupingOptions)

  const [lrOrientation, setLROrientation] = useState<boolean>(props.lrOrientation)
  const [includeHiddenNodes, setIncludeHiddenNodes] = useState<boolean>(false)
  const [includeHiddenTopics, setIncludeHiddenTopics] = useState<boolean>(false)
  const [includeRosoutTopic, setIncludeRosoutTopic] = useState<boolean>(false)
  const [includeParameterEventsTopic, setIncludeParameterEventsTopic] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = React.useState(defaultSelectedTab)
  const [selectedId, setSelectedId] = React.useState(GroupingOptions.third.id)

  const onToggleOrientation = () => {
    const newOrientation = !lrOrientation
    setLROrientation(newOrientation)
    props.onToggleOrientation?.(newOrientation)
  }

  const onZoomInHandler = () => {
    props.onZoomIn?.()
  }

  const onZoomOutHandler = () => {
    props.onZoomOut?.()
  }

  const onFitViewHandler = () => {
    props.onFitview?.()
  }

  const onLayoutGraph = () => {
    props.onLayoutGraph?.(lrOrientation)
  }

  const onToggleIncludeHiddenNodes = (isChecked: boolean) => {
    setIncludeHiddenNodes(isChecked)
  }

  const onToggleIncludeHiddenTopics = (isChecked: boolean) => {
    setIncludeHiddenTopics(isChecked)
  }

  const onToggleIncludeRosoutTopic = (isChecked: boolean) => {
    setIncludeRosoutTopic(isChecked)
  }

  const onToggleIncludeParameterEventsTopic = (isChecked: boolean) => {
    setIncludeParameterEventsTopic(isChecked)
  }

  const filterNodeList = (els: Elements): INodeListItem[] => {
    const nodes = els.filter((el): boolean => {
      return isRosNode(el)
    })
    const elements: INodeListItem[] = nodes.map((node) => {
      return {key: node.id, name: node.data.label as string, isHidden: node.isHidden as boolean}
    })

    const newElements = elements.reduce((filtered: INodeListItem[], item: INodeListItem) => {
      if (item.name.startsWith('_')) {
        if (includeHiddenNodes) {
          filtered.push(item)
        }
      } else {
        filtered.push(item)
      }
      return filtered
    }, [])

    return newElements
  }

  return (
    <Toolbar>
      <br />
      <ExpandingToolbar
        tooltip="Select nodes to display"
        icon={
          <Icon style={iconStyles}>
            <SelectionIcon />
          </Icon>
        }
        style={toolbarStyles}
        className={styles.buttons}
        selectedTab={selectedTab}
        onSelectTab={(newSelectedTab: any) => {
          setSelectedTab(newSelectedTab)
        }}
      >
        <ToolGroup name={'Nodes'}>
          <NodeList
            nodes={filterNodeList(props.elements)}
            onSelectionChange={props.onSelectionChange}
          />
        </ToolGroup>
        <ToolGroup name={'Options'}>
          <>
            <Checkbox
              label="Include hidden nodes"
              checked={includeHiddenNodes}
              onChange={onToggleIncludeHiddenNodes}
            />
            <Checkbox
              label="Include hidden topics"
              checked={includeHiddenTopics}
              onChange={onToggleIncludeHiddenTopics}
            />
            <Checkbox
              label="Include /rosout topic"
              checked={includeRosoutTopic}
              onChange={onToggleIncludeRosoutTopic}
            />
            <Checkbox
              label="Include /parameter_events topic"
              checked={includeParameterEventsTopic}
              onChange={onToggleIncludeParameterEventsTopic}
            />
          </>
        </ToolGroup>
        <ToolGroup name={'Grouping'}>
          <>
            <br />
            <SegmentedControl
              options={optionArray}
              selectedId={selectedId}
              onChange={(newId: any) => setSelectedId(newId)}
            />
          </>
        </ToolGroup>
      </ExpandingToolbar>
      <div className={styles.buttons}>
        <Button className={styles.iconButton} tooltip="Layout node graph" onClick={onLayoutGraph}>
          <Icon style={iconStyles} size="small">
            <NodeGraphIcon />
          </Icon>
        </Button>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.iconButton}
          tooltip="Change graph orientation"
          onClick={onToggleOrientation}
        >
          <Icon style={iconStyles} size="small">
            {lrOrientation ? <ArrowUpDownIcon /> : <ArrowLeftRightIcon />}
          </Icon>
        </Button>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.iconButton} tooltip="Zoom in graph" onClick={onZoomInHandler}>
          <Icon style={iconStyles} size="small">
            <PlusIcon />
          </Icon>
        </Button>
        <Button className={styles.iconButton} tooltip="Zoom out graph" onClick={onZoomOutHandler}>
          <Icon style={iconStyles} size="small">
            <MinusIcon />
          </Icon>
        </Button>
        <Button
          className={styles.iconButton}
          tooltip="Fit graph to window"
          onClick={onFitViewHandler}
        >
          <Icon style={iconStyles} size="small">
            <FitviewIcon />
          </Icon>
        </Button>
      </div>
    </Toolbar>
  )
}
