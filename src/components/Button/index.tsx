import React from 'react';
import {
  PlusOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  ImportOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Tooltip, Popconfirm } from 'antd';
import type { ButtonProps, PopconfirmProps } from 'antd';
import { useRouteMatch, useModel, useIntl } from 'umi';

export type AddButtonProps = ButtonProps & { code: string };

const AddButton: React.FC<AddButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);
  return (
    <>
      {show && (
        <Button icon={<PlusOutlined />} type="primary" {...props} title={undefined}>
          {props.title ? props.title : intl.formatMessage({ id: 'button.add' })}
        </Button>
      )}
    </>
  );
};
export type AddIconButtonProps = ButtonProps & { code: string };

const AddIconButton: React.FC<AddIconButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Tooltip
          title={
            props.title
              ? props.title
              : intl.formatMessage({ id: 'button.add', defaultMessage: 'Add' })
          }
        >
          <Button
            size="middle"
            shape="circle"
            type="link"
            icon={<PlusCircleOutlined />}
            style={{ border: 0 }}
            {...props}
            title={undefined}
          />
        </Tooltip>
      )}
    </>
  );
};

export type DelIconButtonProps = {
  buttonProps?: ButtonProps;
} & PopconfirmProps & { code: string };

const DelIconButton: React.FC<DelIconButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const match = useRouteMatch();
  const intl = useIntl();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Popconfirm
          {...props}
          key="delete"
          title={props.title}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          placement="topLeft"
          onCancel={(e) => e!.stopPropagation()}
        >
          <Tooltip
            title={
              props.buttonProps?.title
                ? props.buttonProps.title
                : intl.formatMessage({ id: 'button.delete', defaultMessage: 'Delete' })
            }
          >
            <Button
              size="middle"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              style={{ border: 0 }}
              onClick={(e) => e.stopPropagation()}
              {...props.buttonProps}
              title={undefined}
            />
          </Tooltip>
        </Popconfirm>
      )}
    </>
  );
};

export type EditIconButtonProps = {
  icon?: React.ReactNode;
} & ButtonProps & { code: string };

const EditIconButton: React.FC<EditIconButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Tooltip
          title={
            props.title
              ? props.title
              : intl.formatMessage({ id: 'button.edit', defaultMessage: 'Edit' })
          }
        >
          <Button
            size="middle"
            shape="circle"
            type="link"
            icon={props.icon ? props.icon : <EditOutlined />}
            style={{ border: 0 }}
            {...props}
            title={undefined}
          />
        </Tooltip>
      )}
    </>
  );
};

export type DetailIconButtonProps = {
  icon?: React.ReactNode;
} & ButtonProps & { code: string };

const DetailIconButton: React.FC<DetailIconButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Tooltip title={props.title ? props.title : 'Detail'}>
          <Button
            size="middle"
            shape="circle"
            type="link"
            icon={props.icon ? props.icon : <EyeOutlined />}
            style={{ border: 0 }}
            {...props}
            title={undefined}
          />
        </Tooltip>
      )}
    </>
  );
};

const DetailIconShowButton: React.FC<DetailIconButtonProps> = (props) => {
  return (
    <>
      {
        <Tooltip title={props.title ? props.title : 'Detail'}>
          <Button
            size="middle"
            shape="circle"
            type="link"
            icon={props.icon ? props.icon : <EyeOutlined />}
            style={{ border: 0 }}
            {...props}
            title={undefined}
          />
        </Tooltip>
      }
    </>
  );
};

export type SelectIconButtonProps = {
  icon?: React.ReactNode;
} & ButtonProps & { code: string };

const SelectIconShowButton: React.FC<SelectIconButtonProps> = (props) => {
  return (
    <>
      {
        <Tooltip title={props.title ? props.title : 'Select'}>
          <Button icon={<CheckCircleOutlined />} type="primary" {...props} title={undefined}>
            {props.title ? props.title : 'Select'}
          </Button>
        </Tooltip>
      }
    </>
  );
};

export type ExportButtonProps = ButtonProps & { code: string };

const ExportButton: React.FC<ExportButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Button icon={<UploadOutlined />} type="primary" {...props} title={undefined}>
          {props.title
            ? props.title
            : intl.formatMessage({ id: 'button.export', defaultMessage: 'Export' })}
        </Button>
      )}
    </>
  );
};
export type ImportButtonProps = ButtonProps & { code: string };

const ImportButton: React.FC<ImportButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Button icon={<ImportOutlined />} type="primary" {...props} title={undefined}>
          {props.title
            ? props.title
            : intl.formatMessage({ id: 'button.import', defaultMessage: 'Import' })}
        </Button>
      )}
    </>
  );
};

export type ProcessButtonProps = ButtonProps & { code: string };

const ProcessButton: React.FC<ProcessButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Button icon={<PlayCircleOutlined />} type="primary" {...props} title={undefined}>
          {props.title ? props.title : 'Process'}
        </Button>
      )}
    </>
  );
};

export type SyncButtonProps = ButtonProps & { code: string };

const SyncButton: React.FC<SyncButtonProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const match = useRouteMatch();
  const code = initialState!.routePathCodeMap![match.path];
  const show = initialState!.flatMenus!.hasOwnProperty(`${code}.${props.code}`);

  return (
    <>
      {show && (
        <Button icon={<SyncOutlined />} type="primary" {...props} title={undefined}>
          {props.title ? props.title : 'Sync'}
        </Button>
      )}
    </>
  );
};

export {
  AddButton,
  AddIconButton,
  DelIconButton,
  EditIconButton,
  DetailIconButton,
  DetailIconShowButton,
  ExportButton,
  ImportButton,
  SyncButton,
  ProcessButton,
  SelectIconShowButton,
};
