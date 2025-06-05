'use client';

import Rive, { Alignment, Fit, Layout } from '@rive-app/react-canvas';
import React from 'react';

export const Loading = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    stateMachines="bumpy"
    layout={new Layout({ fit: Fit.FitHeight, alignment: Alignment.Center })}
  />
);