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

import {useTheme} from '@fluentui/react'
import ChevronRightIcon from '@mdi/svg/svg/chevron-right.svg'
import CloseIcon from '@mdi/svg/svg/close.svg'
import {CSSProperties, FC, memo, useState} from 'react'
import {Handle, NodeProps} from 'react-flow-renderer'
import NodeIcon from './assets/icons/ros_logo.svg'
import Icon from './foxglove/Icon'

const normalOpacity = 0.25
const highlightOpacity = 1.0

const RosNode: FC<NodeProps> = (props: NodeProps) => {
  const theme = useTheme()
  const [opacity, setOpacity] = useState(normalOpacity)

  const nodeStyle: CSSProperties = {
    backgroundColor: 'black',
    border: props.selected ? '2px solid red' : '2px solid rgb(51, 49, 84)',
    boxShadow: 'non !important',
    boxSizing: 'border-box',
    color: 'rgb(255,255,255)',
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: theme.fonts.medium.fontSize,
    fontWeight: theme.fonts.medium.fontWeight as number,
    height: '100%',
    margin: '0px',
    minWidth: '0px',
    padding: '2px',
    position: 'relative',
    width: '100%',
  }

  const headerStyle: CSSProperties = {
    alignItems: 'center',
    backgroundColor: 'rgb(34, 33, 56)',
    border: '0px solid green',
    borderBottom: '1px solid rgb(51, 49, 84)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
  }

  const titleStyle: CSSProperties = {
    border: '0px solid red',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }

  const closeStyle: CSSProperties = {
    border: '0px solid red',
    cursor: 'pointer',
    opacity,
    pointerEvents: 'all',
  }

  const bodyStyle: CSSProperties = {
    backgroundColor: 'rgb(34, 33, 56)',
    border: '0px solid red',
    color: 'rgb(255,255,255,0.5)',
    padding: '8px',
  }

  const handleStyle: CSSProperties = {}

  return (
    <div style={nodeStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>
          <Icon style={{color: 'white', marginRight: '8px'}} size="xsmall">
            <NodeIcon />
          </Icon>
          {props.data.label}
        </div>
        <div
          style={closeStyle}
          onMouseEnter={() => {
            setOpacity(highlightOpacity)
          }}
          onMouseLeave={() => {
            setOpacity(normalOpacity)
          }}
        >
          <Icon
            style={{color: 'white', marginLeft: '8px'}}
            size="xsmall"
            clickable={true}
            onClick={() => {
              props.data.hideNode.hideNode(props.id)
            }}
          >
            <CloseIcon />
          </Icon>
        </div>
      </div>
      <div style={bodyStyle}>
        <Icon size="xsmall">
          <ChevronRightIcon />
        </Icon>
        Parameters
      </div>
      <Handle type="target" position={props.targetPosition!} style={handleStyle} />
      <Handle type="source" position={props.sourcePosition!} style={handleStyle} />
    </div>
  )
}

export default memo(RosNode)
