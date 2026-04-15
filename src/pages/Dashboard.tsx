import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import useProjects, { type Project } from '../hooks/useProjects';
import HeaderMUI from '../components/HeaderMUI';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';

const MemoizedSidebar = memo(Sidebar);

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const userName = useSelector((s: RootState) => s.auth.user?.name);
    const {
        projects,
        columns,
        loading,
        error,
        addProject,
        renameProject,
        deleteProject,
    } = useProjects();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const handleRename = useCallback(
        (project: Project) => {
            void renameProject(project);
        },
        [renameProject]
    );

    const handleDelete = useCallback(
        (id: string) => {
            void deleteProject(id);
        },
        [deleteProject]
    );

    if (loading) return <div className={styles.loading}>Chargement...</div>;

    return (
        <div className={styles.layout}>
            <HeaderMUI
                title="TaskFlow"
                onMenuClick={() => setSidebarOpen((p) => !p)}
                userName={userName}
                onLogout={() => dispatch(logout())}
            />
            <div className={styles.body}>
                <MemoizedSidebar
                    projects={projects}
                    isOpen={sidebarOpen}
                    onRename={handleRename}
                    onDelete={handleDelete}
                />
                <div className={styles.content}>
                    <div className={styles.toolbar}>
                        {error && <div className={styles.error}>{error}</div>}
                        {!showForm ? (
                            <button
                                className={styles.addBtn}
                                onClick={() => setShowForm(true)}
                            >
                                + Nouveau projet
                            </button>
                        ) : (
                            <ProjectForm
                                submitLabel="Créer"
                                onSubmit={addProject}
                                onCancel={() => setShowForm(false)}
                            />
                        )}
                    </div>
                    <MainContent columns={columns} />
                </div>
            </div>
        </div>
    );
}
