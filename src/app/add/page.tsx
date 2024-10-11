"use client";

import { Button, Input, DatePicker, Form, Card, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; 

const { Title } = Typography;

interface Todo {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function AddOrEditTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");

  const [form] = Form.useForm();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);

      if (editId) {
        const todoToEdit = parsedTodos.find(
          (todo: Todo) => todo.id === parseInt(editId, 10)
        );
        if (todoToEdit) {
          setEditingTodo(todoToEdit);
          form.setFieldsValue({
            ...todoToEdit,
            date: dayjs(todoToEdit.date, "DD/MM/YYYY"),
          });
        }
      }
    }
  }, [editId, form]);

  const onFinish = (values: any) => {
    const formattedDate = values.date.format("DD/MM/YYYY"); 

    if (editingTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id
          ? {
              ...editingTodo,
              ...values,
              date: formattedDate, 
            }
          : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        date: formattedDate,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
        >
          {editingTodo ? "Edit To-Do" : "Add New To-Do"}
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Button onClick={() => router.back()} style={{ marginTop: 10 }}>
            ← Back
          </Button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={
            editingTodo
              ? { ...editingTodo, date: dayjs(editingTodo.date, "DD/MM/YYYY") } 
              : {}
          }
          style={{
            maxWidth: "100%",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter a description" },
              { min: 5, message: "Description must be at least 5 characters" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY" 
              disabledDate={(current) => current && current < dayjs().startOf("day")}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {editingTodo ? "Save Changes" : "Add To-Do"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
