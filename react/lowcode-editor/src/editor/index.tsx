import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import { EditArea } from "./components/EditArea";

export default function ReactPlayground() {
    return <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
           Header
        </div>
        <div style={{ flex: 1 }}>
            <Allotment>
                <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
                    <div style={{ padding: '1rem', height: '100%', backgroundColor: '#dbeafe' }}>Material Panel</div>
                </Allotment.Pane>
                <Allotment.Pane>
                    <div style={{ padding: '1rem', height: '100%', backgroundColor: '#dcfce7' }}><EditArea /></div>
                </Allotment.Pane>
                <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
                    <div style={{ padding: '1rem', height: '100%', backgroundColor: '#fef3c7' }}>Setting Panel</div>
                </Allotment.Pane>
            </Allotment>
        </div>
    </div>
}