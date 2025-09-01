import Header from "./Header";
import Content from "./Content";

export default function TheLoai({ title }: { title: string }) {
    return (
        <div>
            <Header />
            {/* <Content title={title} /> */}
        </div>
    );
}
