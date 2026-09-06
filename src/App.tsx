import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SessionStart } from './components/SessionStart';
import { MissionMap } from './components/MissionMap';
import { MissionView } from './components/MissionView';
import { ProjectView } from './components/ProjectView';
import { BossView } from './components/BossView';
import { ReportView } from './components/ReportView';

function Layout() {
  return (
    <div className="min-h-screen bg-[#0A1729]">
      <Header />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/session/:id" element={<SessionStart />} />
          <Route path="/session/:id/map" element={<MissionMap />} />
          <Route path="/session/:id/mission/:missionId" element={<MissionView />} />
          <Route path="/session/:id/project" element={<ProjectView />} />
          <Route path="/session/:id/boss" element={<BossView />} />
          <Route path="/session/:id/report" element={<ReportView />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
