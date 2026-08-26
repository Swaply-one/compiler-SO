import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';

const RiveCharacter = forwardRef(({
  src,
  stateMachineName = 'State Machine 1',
  artboard,
  lookValue = 50,
  isChecking = false,
  isHandsUp = false,
  height = 200,
  fit = Fit.Contain,
  alignment = Alignment.Center,
  style = {},
}, ref) => {
  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: stateMachineName,
    autoplay: true,
    layout: new Layout({
      fit,
      alignment,
    }),
  });

  // State Machine Inputs - standard & variations
  const isCheckingInput = useStateMachineInput(rive, stateMachineName, 'isChecking');
  const numLookInput = useStateMachineInput(rive, stateMachineName, 'numLook');
  const isHandsUpInput = useStateMachineInput(rive, stateMachineName, 'isHandsUp');
  const trigSuccessInput = useStateMachineInput(rive, stateMachineName, 'trigSuccess');
  const trigFailInput = useStateMachineInput(rive, stateMachineName, 'trigFail');

  // Alternate naming conventions
  const checkAlt = useStateMachineInput(rive, stateMachineName, 'Check') || useStateMachineInput(rive, stateMachineName, 'Checking');
  const lookAlt = useStateMachineInput(rive, stateMachineName, 'Look') || useStateMachineInput(rive, stateMachineName, 'look');
  const handsUpAlt = useStateMachineInput(rive, stateMachineName, 'hands_up') || useStateMachineInput(rive, stateMachineName, 'Hands_Up') || useStateMachineInput(rive, stateMachineName, 'handsUp');
  const successAlt = useStateMachineInput(rive, stateMachineName, 'success') || useStateMachineInput(rive, stateMachineName, 'Success');
  const failAlt = useStateMachineInput(rive, stateMachineName, 'fail') || useStateMachineInput(rive, stateMachineName, 'Fail');

  // Apply look value (0-100)
  useEffect(() => {
    if (numLookInput) numLookInput.value = Number(lookValue);
    else if (lookAlt) lookAlt.value = Number(lookValue);
  }, [numLookInput, lookAlt, lookValue]);

  // Apply checking (looking at input)
  useEffect(() => {
    if (isCheckingInput) isCheckingInput.value = Boolean(isChecking);
    else if (checkAlt) checkAlt.value = Boolean(isChecking);
  }, [isCheckingInput, checkAlt, isChecking]);

  // Apply hands up (covering eyes)
  useEffect(() => {
    if (isHandsUpInput) isHandsUpInput.value = Boolean(isHandsUp);
    else if (handsUpAlt) handsUpAlt.value = Boolean(isHandsUp);
  }, [isHandsUpInput, handsUpAlt, isHandsUp]);

  useImperativeHandle(ref, () => ({
    triggerSuccess: () => {
      if (isHandsUpInput) isHandsUpInput.value = false;
      if (handsUpAlt) handsUpAlt.value = false;
      if (isCheckingInput) isCheckingInput.value = false;
      if (checkAlt) checkAlt.value = false;

      if (trigSuccessInput) trigSuccessInput.fire();
      else if (successAlt) successAlt.fire();
    },
    triggerFail: () => {
      if (isHandsUpInput) isHandsUpInput.value = false;
      if (handsUpAlt) handsUpAlt.value = false;
      if (isCheckingInput) isCheckingInput.value = false;
      if (checkAlt) checkAlt.value = false;

      if (trigFailInput) trigFailInput.fire();
      else if (failAlt) failAlt.fire();
    },
    setHandsUp: (val) => {
      if (isHandsUpInput) isHandsUpInput.value = Boolean(val);
      if (handsUpAlt) handsUpAlt.value = Boolean(val);
    },
    setChecking: (val) => {
      if (isCheckingInput) isCheckingInput.value = Boolean(val);
      if (checkAlt) checkAlt.value = Boolean(val);
    },
    setLook: (val) => {
      if (numLookInput) numLookInput.value = Number(val);
      if (lookAlt) lookAlt.value = Number(val);
    }
  }));

  return (
    <div style={{
      width: '100%',
      height: typeof height === 'number' ? `${height}px` : height,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      ...style,
    }}>
      <RiveComponent style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
});

export default RiveCharacter;
