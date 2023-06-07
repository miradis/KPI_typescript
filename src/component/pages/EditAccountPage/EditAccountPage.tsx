import { Button, Card, Form, Input, Modal, Select, Space, Table, Tabs, Typography } from "antd";
import { BackButton } from "../../BackButton/BackBUtton";
import { useState, useEffect, useRef } from "react";
import { IDepartment, IRate, ITeacher } from "../../../common/ITeacher";
import { assignUser, deleteUser, getAllCategories, getAllDepartaments, getAllRates, getAllTeachers, getAllUsers, updateUser } from "../../../services/userService";
import { IUser } from "../../../common/ITeacher";
import { DeleteOutlined, HighlightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { ITask, Status } from "../../../common/IEvent";

const { Title } = Typography;
const { Option } = Select;

const EditAccountPage = () => {
  const [statuses, setStatuses] = useState<Status[] | undefined>(undefined);
  const [categories, setCategories] = useState<ITask[] | undefined>(undefined);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [departments, setDepartments] = useState<IDepartment[] | undefined>(undefined);
  const [rates, setRates] = useState<IRate[] | undefined>(undefined);
  const [selectedEmail, setSelectedEmail] = useState<ITeacher | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [users, setUsers] = useState<IUser[] | undefined>(undefined);
  const [teachers, setTeachers] = useState<ITeacher[] | undefined>(undefined);
  const [editingUser, setEditingUser] = useState<IUser | undefined>(undefined);
  const [editingTeacher, setEditingTeacher] = useState<ITeacher | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [editingRole, setEditingRole] = useState<string[] | undefined>(undefined);
  const [mode, setMode] = useState<"teacher" | "user" | undefined>(undefined);
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();
  const prevSelectedUser = useRef<IUser | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const response = await getAllUsers();
      setUsers(response);
      // Extract distinct user roles
      const distinctRoles: Set<string> = new Set();
      response?.forEach((user: any) => {
        user.roles?.forEach((role: any) => {
          distinctRoles.add(role);
        });
      });
      setRoleOptions(Array.from(distinctRoles));
    };

    fetchUsers();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await getAllTeachers();
      setTeachers(response);
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const getCategories = await getAllCategories();
      setCategories(getCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const alldepartments = await getAllDepartaments();
      setDepartments(alldepartments);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      const allRates = await getAllRates();
      setRates(allRates);
    };

    fetchRate();
  }, []);

  useEffect(() => {
    if (selectedCategory && categories) {
      const selectedCategoryObj = categories.find((cat) => cat.category_name === selectedCategory);
      if (selectedCategoryObj) {
        setStatuses(selectedCategoryObj.statuses);
        setSelectedStatus(selectedCategoryObj.statuses[0].status_name);
      }
    }
  }, [selectedCategory, categories]);

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
  };

  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
  };

  const getUserRoles = (roles: string[]) => {
    const userRoles: string[] = [];

    if (roles?.includes("ROLE_ADMIN")) {
      userRoles.push("Admin");
    }
    if (roles?.includes("ROLE_TEACHER")) {
      userRoles.push("Teacher");
    }
    if (roles?.includes("ROLE_OBSERVER")) {
      userRoles.push("Observer");
    }

    return userRoles;
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  const handleDeleteAcc = async (id: string) => {
    await deleteUser(id).then(() => {
      setUsers((prevUsers) => prevUsers?.filter((user) => user.user_id !== id));
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(undefined);
    setEditingTeacher(undefined);
    setSelectedCategory("");
    setSelectedStatus("");
    setSelectedEmail(undefined);
    setMode(undefined);
  };

  const onFinish = async () => {
    try {
      await form.validateFields();
      const { name, email, role, category, department, rate, status } = form.getFieldsValue();

      if (mode === "user") {
        if (editingUser) {
          await updateUser(editingUser.user_id, email, name, role).then(() => {
            fetchUsers();
          });
        } else {
          await assignUser(email, category, status, department, rate);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUserDate = (id: string, status: string) => {
    if (users) {
      const selectedUser = users.find((user) => user.user_id === id);

      if (selectedUser) {
        form.resetFields();
        form.setFieldsValue({
          email: selectedUser.email,
          role: selectedUser.roles,
          name: selectedUser.name,
        });
      }

      setEditingUser(selectedUser);
      setMode("user");
      setIsModalVisible(true);
    }
  };

  const handleTeacherDate = (id: string, status: string) => {
    if (teachers) {
      const selectedTeacher = teachers?.find((findRole) => findRole.teacher_id === id);

      setEditingTeacher(selectedTeacher);
      setMode("teacher");
      setIsModalVisible(true);
    }
  };

  const columnTeachers = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status_name",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "action",
      render: (_: string, record: any) => {
        return (
          <Button size="small" type="link" onClick={() => handleTeacherDate(record.teacher_id, "teacher")}>
            <HighlightOutlined />
          </Button>
        );
      },
    },
  ];

  const column = [
    {
      title: "Email",
      dataIndex: "email",
      key: "userEmail",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "user_name",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "role",
      render: (roles: string[]) => (
        <span>
          {getUserRoles(roles).map((role) => (
            <span key={role}>{role} </span>
          ))}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "action",
      render: (_: string, record: any) => {
        return (
          <Space size="small">
            <Button size="small" type="link" onClick={() => handleDeleteAcc(record.user_id)}>
              <DeleteOutlined />
            </Button>
            <Button size="small" type="link" onClick={() => handleUserDate(record.user_id, "user")}>
              <HighlightOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <BackButton />
      <Card style={{ marginTop: "1%" }}>
        <Title level={2}>Edit page</Title>
        <Tabs>
          <Tabs.TabPane key="users" tab="Users">
            <Table columns={column} dataSource={users}></Table>
          </Tabs.TabPane>
          <Tabs.TabPane key="teachers" tab="Teachers">
            <Table columns={columnTeachers} dataSource={teachers}></Table>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Edit account"
        open={isModalVisible}
        onCancel={handleModalCancel}
        onOk={onFinish}
      >
        {mode === "user" && (
          <>
            <Form
              initialValues={{
                email: editingUser?.email,
                role: editingUser?.roles,
                name: editingUser?.name,
              }}
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter an email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <FormItem
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please enter a role",
                  },
                ]}
              >
                <Select
                  placeholder="Select an existing role"
                  options={roleOptions.map((opt) => ({
                    key: opt,
                    value: opt,
                  }))}
                ></Select>
              </FormItem>

              <FormItem label="Name" name="name">
                <Input />
              </FormItem>
            </Form>
          </>
        )}

        {mode === "teacher" && (
          <>
            <Form
              initialValues={{
                name: editingTeacher?.name,
                category: editingTeacher?.category_name,
                status: editingTeacher?.status_name,
                department: editingTeacher?.department_name,
                rate: editingTeacher?.teacher_rate,
              }}
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item label="Category" name="category">
                <Select
                  virtual
                  placeholder="Select Category"
                  style={{ width: "100%" }}
                  onChange={handleCategoryChange}
                  options={categories?.map((cat) => ({
                    label: cat.category_name,
                    value: cat.category_name,
                  }))}
                ></Select>
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Select
                  virtual
                  placeholder="Select Status"
                  style={{ width: "100%" }}
                  onChange={handleStatusChange}
                  options={statuses?.map((stat) => ({
                    label: stat?.status_name,
                    value: stat?.status_name,
                  }))}
                ></Select>
              </Form.Item>

              <Form.Item label="Department" name="department">
                <Select
                  style={{ width: "100%" }}
                  options={departments?.map((dep) => ({
                    label: dep.department_name,
                    value: dep.department_name,
                  }))}
                ></Select>
              </Form.Item>
              <Form.Item label="Rate" name="rate">
                <Select
                  style={{ width: "100%" }}
                  options={rates?.map((rat) => ({
                    label: rat.teacher_rate,
                    value: rat.teacher_rate,
                  }))}
                ></Select>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export { EditAccountPage };
