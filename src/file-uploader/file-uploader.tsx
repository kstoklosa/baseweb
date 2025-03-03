/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Dropzone from 'react-dropzone';

import { LocaleContext } from '../locale';
import { useStyletron } from '../styles';
import { Button, KIND, SHAPE, SIZE as BUTTON_SIZE } from '../button';
import { getOverrides } from '../helpers/overrides';
import { ProgressBar } from '../progress-bar';
import { Spinner, SIZE as SPINNER_SIZE } from '../spinner';

import {
  StyledRoot,
  StyledFileDragAndDrop,
  StyledContentMessage,
  StyledContentSeparator,
  StyledErrorMessage,
  StyledHiddenInput,
} from './styled-components';
import type { PropsT } from './types';

import type { SyntheticEvent } from 'react';

function prependStyleProps(styleProps) {
  return Object.keys(styleProps).reduce((nextStyleProps, currentKey) => {
    nextStyleProps[`$${currentKey}`] = styleProps[currentKey];
    return nextStyleProps;
  }, {});
}

function FileUploader(props: PropsT) {
  const { overrides = {} } = props;
  const [, theme] = useStyletron();

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [FileDragAndDrop, fileDragAndDropProps] = getOverrides(
    overrides.FileDragAndDrop,
    StyledFileDragAndDrop
  );
  const [ContentMessage, contentMessageProps] = getOverrides(
    overrides.ContentMessage,
    StyledContentMessage
  );

  const [ContentSeparator, contentSeparatorProps] = getOverrides(
    overrides.ContentSeparator,
    StyledContentSeparator
  );
  const [ErrorMessage, errorMessageProps] = getOverrides(
    overrides.ErrorMessage,
    StyledErrorMessage
  );
  const [HiddenInput, hiddenInputProps] = getOverrides(overrides.HiddenInput, StyledHiddenInput);
  const [ButtonComponent, buttonProps] = getOverrides(overrides.ButtonComponent, Button);

  const [RetryButtonComponent, retryButtonProps] = getOverrides(
    overrides.RetryButtonComponent,
    Button
  );
  const [CancelButtonComponent, cancelButtonProps] = getOverrides(
    overrides.CancelButtonComponent,
    Button
  );

  const [SpinnerComponent, spinnerProps] = getOverrides(overrides.Spinner, Spinner);
  const [ProgressBarComponent, progressBarProps] = getOverrides(overrides.ProgressBar, ProgressBar);

  const afterFileDrop = !!(props.progressAmount || props.progressMessage || props.errorMessage);

  return (
    // @ts-expect-error todo(flow->ts): dropzone api
    <Dropzone {...props} disabled={props.disabled || afterFileDrop}>
      {(renderProps) => {
        const { getRootProps, getInputProps, open, ...styleProps } = renderProps;

        const prefixedStyledProps = prependStyleProps({
          ...styleProps,
          isDisabled: props.disabled,
          afterFileDrop,
        });

        const getRootPropsArgs: {
          onClick?: (a: SyntheticEvent<HTMLElement>) => void;
          tabIndex: number;
        } = {
          ...(props.disableClick ? { onClick: (evt) => evt.preventDefault() } : {}),
          tabIndex: -1,
        };

        return (
          <LocaleContext.Consumer>
            {(locale) => (
              <Root data-baseweb="file-uploader" {...prefixedStyledProps} {...rootProps}>
                <FileDragAndDrop
                  {...getRootProps(getRootPropsArgs)}
                  {...prefixedStyledProps}
                  {...fileDragAndDropProps}
                >
                  {!afterFileDrop && (
                    <React.Fragment>
                      <ContentMessage {...prefixedStyledProps} {...contentMessageProps}>
                        {locale.fileuploader.dropFilesToUpload}
                      </ContentMessage>
                      {/* TODO(v11): ContentSeparator potentially can be removed in the next major version */}
                      <ContentSeparator {...prefixedStyledProps} {...contentSeparatorProps}>
                        {locale.fileuploader.or}
                      </ContentSeparator>
                      <ButtonComponent
                        disabled={props.disabled}
                        kind={KIND.secondary}
                        shape={SHAPE.pill}
                        size={BUTTON_SIZE.compact}
                        onClick={open}
                        role="button"
                        overrides={{
                          BaseButton: {
                            style: ({ $theme }) => ({
                              marginTop: $theme.sizing.scale500,
                            }),
                          },
                        }}
                        {...prefixedStyledProps}
                        {...buttonProps}
                      >
                        {locale.fileuploader.browseFiles}
                      </ButtonComponent>
                    </React.Fragment>
                  )}

                  {afterFileDrop && (
                    <React.Fragment>
                      {/**
                       * Below checks typeof value to ensure if progressAmount = 0 we will
                       * render the progress bar rather than the spinner. Providing a number
                       * value implies that we expect to have some progress percent in the
                       * future. We do not want to flash the spinner in this case.
                       */}
                      {typeof props.progressAmount === 'number' ? (
                        <ProgressBarComponent
                          value={props.progressAmount}
                          overrides={{
                            BarProgress: {
                              style: ({ $theme }) => ({
                                backgroundColor: props.errorMessage
                                  ? $theme.colors.negative
                                  : $theme.colors.accent,
                              }),
                            },
                          }}
                          {...progressBarProps}
                        />
                      ) : props.errorMessage ? null : (
                        <SpinnerComponent
                          $size={SPINNER_SIZE.medium}
                          $style={{ marginBottom: theme.sizing.scale300 }}
                          {...spinnerProps}
                        />
                      )}
                      {(props.errorMessage || props.progressMessage) && props.errorMessage ? (
                        <ErrorMessage {...prefixedStyledProps} {...errorMessageProps}>
                          {props.errorMessage}
                        </ErrorMessage>
                      ) : (
                        <ContentMessage {...prefixedStyledProps} {...contentMessageProps}>
                          {props.progressMessage}
                        </ContentMessage>
                      )}
                      {props.errorMessage ? (
                        <RetryButtonComponent
                          kind={KIND.tertiary}
                          onClick={() => {
                            props.onRetry && props.onRetry();
                          }}
                          aria-invalid={Boolean(props.errorMessage)}
                          aria-describedby={props['aria-describedby']}
                          aria-errormessage={props.errorMessage}
                          {...retryButtonProps}
                        >
                          {locale.fileuploader.retry}
                        </RetryButtonComponent>
                      ) : (
                        <CancelButtonComponent
                          kind={KIND.tertiary}
                          onClick={() => {
                            props.onCancel && props.onCancel();
                          }}
                          aria-describedby={props['aria-describedby']}
                          overrides={{
                            BaseButton: {
                              style: ({ $theme }) => ({
                                color: $theme.colors.contentNegative,
                              }),
                            },
                          }}
                          {...cancelButtonProps}
                        >
                          {locale.fileuploader.cancel}
                        </CancelButtonComponent>
                      )}
                    </React.Fragment>
                  )}
                </FileDragAndDrop>

                <HiddenInput
                  aria-invalid={Boolean(props.errorMessage) || null}
                  aria-describedby={props['aria-describedby']}
                  aria-errormessage={props.errorMessage || null}
                  {...getInputProps()}
                  {...prefixedStyledProps}
                  {...hiddenInputProps}
                />
              </Root>
            )}
          </LocaleContext.Consumer>
        );
      }}
    </Dropzone>
  );
}

FileUploader.defaultProps = {
  disableClick: true,
  overrides: {},
};

export default FileUploader;
