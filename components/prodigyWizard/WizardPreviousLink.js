import React from "react";
import Link from "next/link";
import { WizardContext } from "./Wizard";

export const WizardPreviousLink = (props) => {
    const { previousHref } = React.useContext(WizardContext);
    if (!previousHref) return null;
    return <Link href={previousHref} {...props} />;
};
