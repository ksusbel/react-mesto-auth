import React from "react";
import { useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = React.useCallback(useNavigate());

        return <Component navigate={navigate} {...props} />;
    };

    return Wrapper;
};
