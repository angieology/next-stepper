import React from "react";
import Link from "next/link";
import { WizardContext } from "./Wizard";

export const WizardNextLink = (props) => {
    const { nextHref } = React.useContext(WizardContext);
    if (!nextHref) return null;
    return <Link href={nextHref} {...props} />;
};
