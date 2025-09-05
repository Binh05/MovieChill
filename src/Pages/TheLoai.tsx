import Header from "./Header";
import Content from "./Content";

export default function TheLoai({ title }: { title: string }) {
    return (
        <div className="space-y-60">
            <div>
                <Header />
            </div>
            <div>
                <Content title={title} />
            </div>
        </div>
    );
}
