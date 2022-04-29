// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2019-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import tinyColor from 'tinycolor2'
//const tinyColor = require('tinycolor2');

const robotStylesColors = {
  DARK: '#08080a',
  DARK1: '#111114',
  DARK2: '#1a1a1f',
  DARK3: '#242429',
  DARK4: '#2d2d33',
  DARK5: '#36363d',
  DARK6: '#404047',
  DARK7: '#4b4b52',
  DARK8: '#55555c',
  DARK9: '#606066',

  LIGHT: '#ffffff',
  LIGHT1: '#f0f0f0',
  LIGHT2: '#cacacc',

  GRAY: '#9f9fa2',
  GRAY2: '#2d2c33',
  GRAY3: '#586e75',

  MAGENTAL1: '#e05ffa',
  MAGENTA: '#c83deb',
  MAGENTA1: '#b024d6',

  PURPLEL1: '#9987ff',
  PURPLE: '#7c6bff',
  PURPLE1: '#6858f5',

  BLUEL1: '#45a5ff',
  BLUE: '#248eff',
  BLUE1: '#0f71f2',

  TEALL1: '#2abed1',
  TEAL: '#00a8c2',
  TEAL1: '#0090ad',

  GREENL1: '#1abd89',
  GREEN: '#00a375',
  GREEN1: '#008768',
  GREEN2: '#05d27d',

  LIMEL1: '#6bd66f',
  LIME: '#4ac252',
  LIME1: '#31ad49',

  YELLOWL1: '#f5d358',
  YELLOW: '#f7be00',
  YELLOW1: '#eba800',

  ORANGEL1: '#fc8942',
  ORANGE: '#f76c1b',
  ORANGE1: '#e5540b',
  ORANGE2: '#ccb862',

  REDL1: '#ff6b82',
  RED: '#f54966',
  RED1: '#db3553',
  RED2: '#ff7c96',
}

export const colors = {
  ...robotStylesColors,
  PRIMARY: robotStylesColors.PURPLE,
  HIGHLIGHT: '#29bee7',
  HIGHLIGHT_MUTED: '#29bee744',
  HOVER_BACKGROUND_COLOR: tinyColor(robotStylesColors.PURPLE).setAlpha(0.2).toRgbString(),
  DISABLED: robotStylesColors.DARK9,
  TEXTL1: robotStylesColors.LIGHT2,
  ACTION: robotStylesColors.BLUE,
  TEXT: robotStylesColors.LIGHT1,
  TOOLBARL1: robotStylesColors.DARK4,
  BRIGHT_YELLOW: '#f6ff00',
  BORDER_LIGHT: tinyColor(robotStylesColors.LIGHT).setAlpha(0.1).toRgbString(),
  DIFF_MODE_SOURCE_1: robotStylesColors.MAGENTA,
  DIFF_MODE_SOURCE_2: robotStylesColors.TEAL,
  DIFF_MODE_SOURCE_BOTH: robotStylesColors.DARK7,
  LEGEND_HIGHLIGHT_COLOR: 'rgba(36, 36, 41, 0.7)',
  LEGEND_HIGHLIGHT_COLOR_BRIGHT: '#37373f',
  LEGEND_HIGHLIGHT_COLOR_BRIGHTER: '#4d4d57',
  CYAN: '#00ffff',

  BACKGROUND: '#121217',
  BACKGROUND_CONTROL: 'rgba(247, 247, 243, 0.1)',
  BACKGROUND_CONTROL_SELECTED: 'rgba(59, 46, 118, 0.6)',
  BACKGROUND_DISABLED: 'rgba(255, 255, 255, 0.3)',
  BACKGROUND_FOCUSED: 'rgba(255, 255, 255, 0.075)',

  TEXT_BRIGHT: 'rgba(247, 247, 243, 0.88)',
  TEXT_NORMAL: 'rgba(247, 247, 243, 0.77)',
  TEXT_DISABLED: 'rgba(247, 247, 243, 0.15)',
  TEXT_MUTED: 'rgba(247, 247, 243, 0.3)',
  TEXT_CONTROL: 'rgba(247, 247, 243, 0.77)',
  TEXT_CONTROL_HOVER: 'rgba(247, 247, 243, 1)',

  TEXT_INPUT: 'rgba(0, 0, 0, 0.8)',
  TEXT_INPUT_DISABLED: 'rgba(0, 0, 0, 0.3)',

  MENU_ITEM_SELECTED: 'rgba(45, 45, 51, 1)',

  DIVIDER: 'rgba(247, 247, 243, 0.1)',

  LIGHT_PURPLE: '#b79dca',
  GREY: '#e7e9ef',
  TOOLBAR_FIXED: '#1f1e27',
  ACCENT: '#248eff',
}

export const spacing = {
  PADDING: '8px',
  CONTROL_PADDING: '8px 8px 8px 16px',
  CONTROL_MARGIN: '0 0.2em',
  TEXT_SIZE: '12px',
  TOP_BAR_HEIGHT: '36px',
  PANEL_TOOLBAR_HEIGHT: '26px',
  PANEL_TOOLBAR_SPACING: '4px',
  PLAYBACK_CONTROL_HEIGHT: '50px',
}

export const textSize = {
  SMALL: '12px',
  NORMAL: '14px',
  LARGE: '16px',
  H5: '20px',
  H4: '24px',
  H3: '32px',
  H2: '48px',
  H1: '64px',
}

export const rounded = {
  SMALL: '2px',
  NORMAL: '4px',
  LARGE: '8px',
  PILL: '999px',
  CIRCLE: '50%',
}

export const fonts = {
  MONOSPACE: "'IBM Plex Mono', monospace",
  SANS_SERIF: "'Inter', sans-serif",
  SANS_SERIF_FEATURE_SETTINGS:
    // enable font features https://rsms.me/inter/lab
    "'cv08', 'cv10', 'tnum'",
}
