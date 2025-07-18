import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { fetchNik, delNik, syncKaryawan } from '@/services/master/nik';
import NikModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton, SyncButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Nik;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Nik: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Nik';
  const editTitle = 'Edit Nik';
  const delTip = 'Delete Nik';

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

  const columns: ProColumns<API.Nik>[] = [
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name', // Query field unit_name
      search: false,
    },
    {
      title: 'Cabang',
      dataIndex: 'cabang_name',
      ellipsis: true,
      width: 160,
      key: 'cabang_name', // Query field cabang_name
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
      width: 130,
      key: 'nik', // Query field nik
      sorter: true,
    },
    {
      title: 'NIK Lama',
      dataIndex: 'old_nik',
      width: 130,
      key: 'old_nik', // Query field old_nik
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
      sorter: true,
      // sorter: (a, b) => {
      //   return a.name!.localeCompare(b.name!);
      // },
    },
    // {
    //   title: 'Active',
    //   dataIndex: 'flag_aktif',
    //   width: 130,
    //   search: false,
    //   render: (_, record) => {
    //     const status = record.flag_aktif;
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
              const res = await delNik(record.id!);
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
      <ProTable<API.Nik, API.PaginationParam>
        headerTitle="Master NIK"
        columns={columns}
        actionRef={actionRef}
        //  request={fetchNik}
        request={(params, sort, filter) => {
          // console.log(sorter == null ? '' : Object.keys(sorter));
          return fetchNik({ ...params, sort, filter });
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
          <SyncButton
            key="SyncKaryawan"
            code="SyncKaryawan"
            onClick={async () => {
              await syncKaryawan();

              message.success('Sync will be Process in background, Please wait in 10 minute');
            }}
          />,
        ]}
      />
      <NikModal
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

export default Nik;
