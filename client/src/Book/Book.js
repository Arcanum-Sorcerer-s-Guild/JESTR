import HTMLFlipBook from "react-pageflip";
import React from "react";
import AllReservations from "../AllReservations/AllReservations";

const MyBook = (props) => {
    const Page = React.forwardRef((props, ref) => {
        return (
            <div className="demoPage" ref={ref}> /* ref required */
                <h1>Page Header</h1>
                <p>{props.children}</p>
                <p>Page number: {props.number}</p>
            </div>
        );
    });
    return (
        <div className="w-20">
            <HTMLFlipBook width={900}
                height={733}
                size="stretch"
                minWidth={315}
                maxWidth={700}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}>
                <div className="demoPage bg-blue">Page 1</div>
                <div className="demoPage bg-bluer"><AllReservations /></div>
                <div className="demoPage bg-gray">Page 3</div>
                <div className="demoPage">Page 4</div>
            </HTMLFlipBook>
        </div>
    );
}

export default MyBook