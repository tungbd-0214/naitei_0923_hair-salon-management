import React, { useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Form, Input, Select, Button, notification } from 'antd';
import { useLang } from '../../Context/LangContext';
import { Inertia } from '@inertiajs/inertia'
import 'antd/dist/antd.css';

export default function Edit(props) {
    const [staff, setStaff] = useState(props[0].staff);
    const { lang } = useLang();
    const [form] = Form.useForm();

    useEffect(() => {

        fillInitialValue();
    }, []);

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 8,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 4,
            span: 8,
        },
    };

    const onFinish = (values) => {

        Inertia.put(route('staffs.update', { id: staff.id }), values, {
            onSuccess: () => {
                openNotification('success',
                    lang.get('strings.Successfully-Updated'),
                    lang.get('strings.User-Updated-Noti')
                );
            },
            onError: (error) => {
                openNotification('error',
                    lang.get('strings.Somethings-went-wrong'),
                    error.update
                );
            }
        })
    };

    const fillInitialValue = () => {
        form.setFieldsValue(staff);
    };

    const roleOptions = [];

    props[0].salonRoles.forEach((role) => {
        roleOptions.push({
            label: role.name,
            value: role.id,
        })
    });

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{lang.get('strings.dashboard')}</h2>}
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">
                            {lang.get('strings.Edit-Staff')}: {staff.first_name || 'Tung'}
                        </h3>
                    </div>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="salon_role"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                options={roleOptions}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                {lang.get('strings.Update')}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Authenticated>
    );
}
