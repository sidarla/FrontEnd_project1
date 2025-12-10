import ApplicationList from "./ApplicationList";
import Analytics from "./Analytics";
import Layout from "./Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="dashboard-grid">
        <section className="dashboard-section main-list">
          <ApplicationList />
        </section>
        <section className="dashboard-section analytics-preview">
          <Analytics />
        </section>
      </div>
    </Layout>
  );
}
