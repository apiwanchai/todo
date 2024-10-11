
# Todo List Application

This is a simple to-do list application built using [Next.js](https://nextjs.org), bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The app allows users to create, edit, and delete tasks, and it stores the task data locally using the browser's `localStorage`.

## Getting Started

First, clone the repository and install the dependencies.

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features of the To-Do List

### 1. **Add Task**
   Users can add tasks by clicking the "Add Task" button. It takes the user to a separate page where they can enter the task details such as title, description, and due date. 

### 2. **Edit Task**
   To edit an existing task, click the edit button (pencil icon) next to the task. This will redirect the user to the task editing page where they can update the task's information.

### 3. **Delete Task**
   Tasks can be deleted by clicking the delete button (trash can icon). Before deleting, a confirmation modal will appear to ensure that the task should be permanently removed.

### 4. **Mark Task as Completed**
   Users can mark a task as completed by checking the checkbox next to each task. Completed tasks will be styled with a strikethrough to indicate that they are done.

### 5. **Data Persistence with `localStorage`**
   All tasks are saved in the browser’s `localStorage`, meaning that they will persist even after refreshing the page. When the user modifies a task (adds, edits, or deletes), the data is updated in `localStorage` automatically. If no tasks remain, the app will clear the stored data.

### 6. **Responsive Design**
   The application is designed to be responsive, ensuring a great experience on both mobile devices and larger screens. The layout adjusts based on the screen size, and media queries are used to fine-tune the design for smaller devices.

## How It Works

1. **Home Page**: 
   The home page displays all tasks in a card layout. Each card shows the task title, description, and due date. It also has buttons for editing or deleting tasks, as well as a checkbox to mark the task as completed.

2. **Add/Edit Task Page**: 
   The add and edit pages share a form layout where users can input or modify task details. When the form is submitted, the task is either added to the list or updated.

3. **State Management**:
   - The application uses React's `useState` to manage the list of tasks and their statuses.
   - `useEffect` is used to synchronize the tasks between the component state and `localStorage`.
   - When a task is added, edited, or deleted, the updated task list is saved to `localStorage`, ensuring persistence.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Ant Design**: A popular React UI library used for components like cards, buttons, modals, and typography.
- **React Hooks**: `useState` and `useEffect` are used for state management and side effects.
- **LocalStorage**: Task data is stored locally in the browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
