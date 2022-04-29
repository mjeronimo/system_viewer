// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// Copyright 2021 Open Source Robotics Foundation, Inc.
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

import {ArrowHeadType, Elements} from 'react-flow-renderer'

// import { Elements, XYPosition, ArrowHeadType } from "react-flow-renderer";
// const position: XYPosition = { x: 0, y: 0 };

export const initialElements: Elements = [
  {
    id: '0-bluesalley-130956-0x5571dbae10b0',
    type: 'rosNode',
    isHidden: false,
    data: {
      namespace: '',
      label: 'talker',
    },
    position: {
      x: 0,
      y: 0,
    },
    style: {
      width: 275,
      height: 79,
    },
  },
  {
    id: '0-bluesalley-131016-0x55d655274fb0',
    type: 'rosNode',
    isHidden: false,
    data: {
      namespace: '',
      label: 'listener',
    },
    position: {
      x: 0,
      y: 0,
    },
    style: {
      width: 275,
      height: 79,
    },
  },
  {
    id: 'topic-/rosout',
    type: 'rosTopic',
    isHidden: false,
    data: {
      label: '/rosout',
      namespace: '',
    },
    position: {
      x: 0,
      y: 0,
    },
    style: {
      width: 275,
      height: 79,
    },
  },
  {
    id: 'topic-/parameter_events',
    type: 'rosTopic',
    isHidden: false,
    data: {
      label: '/parameter_events',
      namespace: '',
    },
    position: {
      x: 0,
      y: 0,
    },
    style: {
      width: 275,
      height: 79,
    },
  },
  {
    id: 'topic-/chatter',
    type: 'rosTopic',
    isHidden: false,
    data: {
      label: '/chatter',
      namespace: '',
    },
    position: {
      x: 0,
      y: 0,
    },
    style: {
      width: 275,
      height: 79,
    },
  },
  {
    id: '0-bluesalley-130956-0x5571dbae06e0-/rosout',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: '0-bluesalley-130956-0x5571dbae10b0',
    target: 'topic-/rosout',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-131016-0x55d65526c3a0-/rosout',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: '0-bluesalley-131016-0x55d655274fb0',
    target: 'topic-/rosout',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-130956-0x5571dbb1c0f0-/parameter_events',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: '0-bluesalley-130956-0x5571dbae10b0',
    target: 'topic-/parameter_events',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-131016-0x55d6552afeb0-/parameter_events',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: '0-bluesalley-131016-0x55d655274fb0',
    target: 'topic-/parameter_events',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-130956-0x5571dbb22190-/parameter_events',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: 'topic-/parameter_events',
    target: '0-bluesalley-130956-0x5571dbae10b0',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-131016-0x55d6552b6040-/parameter_events',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: 'topic-/parameter_events',
    target: '0-bluesalley-131016-0x55d655274fb0',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-130956-0x5571dbb22150-/chatter',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: '0-bluesalley-130956-0x5571dbae10b0',
    target: 'topic-/chatter',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
  {
    id: '0-bluesalley-131016-0x55d6552b51f0-/chatter',
    type: 'default',
    isHidden: false,
    label: '10Hz',
    labelStyle: {
      fill: 'white',
    },
    labelBgStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    source: 'topic-/chatter',
    target: '0-bluesalley-131016-0x55d655274fb0',
    animated: true,
    arrowHeadType: ArrowHeadType.ArrowClosed,
  },
]
