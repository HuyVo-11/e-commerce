import { Link, useLocation } from "react-router-dom";

import styles from './Breadcrumb.module.scss';
import { ChevronRight } from "lucide-react";
import { routes } from "../../router";

const Breadcrumb = () => {
    const { pathname } = useLocation(); //destructing, lấy thẳng pathname ra từ React Router bằng cách dùng useLocation.
                                        // const location = useLocation()
                                        // const path = location.pathname.
                                        // ví dụ : pathname : '/shop/shirt'
    // Không hiển thị ở trang chủ
    if (pathname === '/') return null;

    // Tách chuỗi
    const segments = pathname.split('/')    // phân đoạn ngay vị trí ký tự '/'
                                            // /shop/shirt -> ['', 'shop', 'shirt'] ; lưu ý luôn luôn có chuỗi rỗng vì path bắt đầu bằng '/'
                    .filter(Boolean);       // .filter giữ lại các phần tử mà callback trả về true, Boolean ở đây làm callback
                                            // nếu Boolean('shop') -> true
                                            //     Boolean('shirt')-> true
                                            //     Boolean('') -> false
                                            // mục đích của const segments là loại bỏ chuỗi rỗng ''
                                            // segments = ['shop', 'shirt']

    const paths = segments.map((segment, index) => {   // Dùng .map để duyệt từng phần từng trong array,
                                                        // và tạo 1 array mới từ các giá trị mới mà callback trả về
                                                        // segment là giá trị hiện tại 'shop, shirt'
                                                        // index là vị trí của phần tử, shop === index 0

        const url = `/${segments.slice(0, index + 1).join('/')}`;   // tạo url cho từng cấp
                                                                    // slice(start,end) => lấy tới trc vị trí end
                                                                    // slice(0,1) => ['shop']
                                                                    // slice(1,2) => ['shirt']
                                                                    // slice(0, index + 1) để lấy luôn giá trị tại end => ['shop', 'shirt']
                                                                    //join '/' => shop/shirt
                                                                    // `` + '/' => /shop/shirt

        const route = routes.find((item) => item.path === url);     // .find() duyệt qua Array và trả về phần tử đầu tiên thoả mãn
                                                                    //(item) => item.path === url
                                                                    // là callback function
                                                                    // item là từng object trong routes
                                                                    // url trùng với item.path nào thì item đó đc trả ra
        return {
            path: segment,
            title: route.title ?? segment, // nếu có route.title thì dùng, ko thì lấy segment, cách tránh crash
            url,
        }
    })
    return (
        <div className={styles.breadcrumbWrapper}>
            <div className={styles.breadcrumb}>
                <Link to='/'>Home</Link>
                {paths.map((item, index) => (
                        <span key={item.url} className={styles.breadcrumbItem}>
                            <ChevronRight />
                            {index === paths.length - 1 ? (
                                <span>{item.title}</span>
                            ) : (
                                <Link to={item.url}>{item.title}</Link>
                            )}
                        </span>
                ))}
            </div>
        </div>

    )
}

export default Breadcrumb;