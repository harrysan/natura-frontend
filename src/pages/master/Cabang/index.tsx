import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { fetchCabang, delCabang } from '@/services/master/cabang';
import CabangModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Cabang;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Cabang: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Cabang';
  const editTitle = 'Edit Cabang';
  const delTip = 'Delete Cabang';

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.ADD:
          return {
            visible: true,
            title: addTitle,
          };
        case ActionTypeEnum.EDIT:
          return {
            visible: true,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visible: false,
            title: '',
            id: undefined,
          };
        default:
          return pre;
      }
    },
    { visible: false, title: '' },
  );

  const columns: ProColumns<API.Cabang>[] = [
    // {
    //   title: 'Unit',
    //   dataIndex: 'unit_name',
    //   ellipsis: true,
    //   width: 160,
    //   key: 'unit_name', // Query field unit_name
    //   search: false,
    // },
    {
      title: 'Unit',
      dataIndex: 'unit.code',
      width: 100,
      search: false,
      render: (_, record) => {
        return record.unit ? <Space>{record.unit?.code}</Space> : '-';
      },
    },
    {
      title: 'Kode Cabang',
      dataIndex: 'code',
      width: 130,
      key: 'code', // Query field name
      sorter: true,
    },
    {
      title: 'Kode DC',
      dataIndex: 'dc_code',
      width: 130,
      key: 'dc_code', // Query field name
      sorter: true,
    },
    {
      title: 'Reference ID',
      dataIndex: 'reference_id',
      width: 130,
      key: 'reference_id', // Query field name
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
      sorter: true,
    },
    // {
    //   title: 'Active',
    //   dataIndex: 'flag_active',
    //   width: 130,
    //   search: false,
    //   render: (_, record) => {
    //     const status = record.flag_active;
    //     return <Tag color={status ? 'success' : 'error'}>{status ? 'enabled' : 'disabled'}</Tag>;
    //   },
    // },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => (
        <Space size={2}>
          <EditIconButton
            key="edit"
            code="edit"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          <DelIconButton
            key="delete"
            code="delete"
            title={delTip}
            onConfirm={async () => {
              const res = await delCabang(record.id!);
              if (res.success) {
                message.success('Delete successfully');
                actionRef.current?.reload();
              }
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Cabang, API.PaginationParam>
        headerTitle="Master Cabang"
        columns={columns}
        actionRef={actionRef}
        //request={fetchCabang}
        request={(params, sort, filter) => {
          return fetchCabang({ ...params, sort, filter });
        }}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
        scroll={{ x: 1000 }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddButton
            key="add"
            code="add"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.ADD });
            }}
          />,
        ]}
      />
      <CabangModal
        visible={state.visible}
        title={state.title}
        id={state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
        onSuccess={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default Cabang;
