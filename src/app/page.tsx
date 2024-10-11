"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Checkbox,
  Modal,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";


const { Title, Text } = Typography;

interface Todo {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setIsLoading(false); 
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos"); 
    }
  }, [todos]);

  const handleDelete = (id: number) => {
    setIsLoading(true); 
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setIsDeleteModalVisible(false);
    setIsLoading(false); 
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
        padding: "40px 20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "600px",
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}
        >
          To-Do List
        </Title>
        <Text
          strong
          style={{ marginBottom: 20, display: "block", textAlign: "center" }}
        >
          My Tasks
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Link href="/add">
            <Button type="primary" style={{ borderRadius: "5px" }}>
              Add Task
            </Button>
          </Link>
        </div>

        <div>
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Spin size="large" />
            </div>
          ) : todos.length === 0 ? (
            <Text>You have 0 tasks!</Text>
          ) : (
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                paddingRight: "20px",
              }}
            >
              <Row gutter={[0, 16]}>
                {todos.map((todo) => (
                  <Col xs={24} key={todo.id}>
                    <Card
                      style={{
                        borderRadius: "8px",
                        transition: "box-shadow 0.3s ease-in-out",
                      }}
                    >
                      <Row align="middle" justify="space-between">
                        <Col>
                          <Checkbox
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                            style={{ transform: "scale(1.2)" }}
                          />
                        </Col>
                        <Col flex="auto" style={{ paddingLeft: "16px" }}>
                          <Title
                            level={5}
                            style={{
                              margin: 0,
                              textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                              color: todo.completed ? "#aaa" : "#333",
                            }}
                          >
                            {todo.title}
                          </Title>
                          <Text
                            style={{
                              display: "block",
                              marginTop: "4px",
                              color: "#555",
                            }}
                          >
                            {todo.description}
                          </Text>
                          <Text
                            type="secondary"
                            style={{ display: "block", marginTop: "8px" }}
                          >
                            Due: {todo.date}
                          </Text>
                        </Col>
                        <Col>
                          <Space>
                            <Link href={`/add?editId=${todo.id}`}>
                              <Button
                                icon={<EditOutlined />}
                                size="small"
                                style={{
                                  backgroundColor: "#1890ff",
                                  color: "white",
                                  borderRadius: "5px",
                                  border: "none",
                                }}
                              />
                            </Link>
                            <Button
                              icon={<DeleteOutlined />}
                              size="small"
                              danger
                              style={{
                                borderRadius: "5px",
                                border: "none",
                              }}
                              onClick={() => {
                                setDeleteTodoId(todo.id);
                                setIsDeleteModalVisible(true);
                              }}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>

        <Modal
          title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={() => handleDelete(deleteTodoId!)}
          onCancel={() => setIsDeleteModalVisible(false)}
        >
          <p>Are you sure you want to delete this task?</p>
        </Modal>
      </div>
    </div>
  );
}
