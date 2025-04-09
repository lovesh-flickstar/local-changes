import { MdCropRotate } from 'react-icons/md';
import { IoColorFilterOutline } from 'react-icons/io5';
import { PiTextAa, PiMusicNotesPlus } from 'react-icons/pi';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import React from 'react';

export const tools = [
    { id: "crop", icon: React.createElement(MdCropRotate)  },
    { id: "filter", icon: React.createElement(IoColorFilterOutline) },
    { id: "text", icon: React.createElement(PiTextAa ) },
    { id: "music", icon: React.createElement(PiMusicNotesPlus) },
    { id: "adjustment", icon: React.createElement(TbAdjustmentsHorizontal) }
]