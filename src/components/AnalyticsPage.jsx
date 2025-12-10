import Layout from "./Layout";
import Analytics from "./Analytics";

export default function AnalyticsPage() {
    return (
        <Layout>
            <div className="analytics-page-header" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-main)", margin: 0 }}>Advanced Analytics</h2>
                <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                    Adding new feature in few days...
                </p>
            </div>
            <Analytics />
        </Layout>
    );
}
