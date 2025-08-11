# Task & Project Management Dashboard (Minimal Interview-ready scaffold)

Features included:
- Mock authentication (login/register) with local storage user
- Role-based guard (admin/user)
- Dashboard with summary cards
- Projects (list, search, pagination, add/edit/delete) using hardcoded JSON in service
- Tasks board with Angular CDK drag-and-drop
- Signals for state (user, projects, tasks)
- Reusable components: loader, toast, pagination
- TailwindCSS for styling
- Lazy-loaded modules for Auth, Projects, Tasks
- Http interceptor placeholder and error toast service

How to run:
1. npm install
2. ng serve

Notes:
- This is a compact scaffold designed for interview/demo usage and matches the requested Angular CLI and Node environment.
- All data is stored in services (hardcoded). No backend required.
