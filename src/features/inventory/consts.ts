import Chat from "../chat/Chat";
import Stats from "../chat/Chat";
import Access from "../access/Access";
import CustomID from "../customID/CustomId";
import Export from "../export/Export";
import { JSX } from "react";
import Settings from "../settings/Settings";
import Fields from "../fields/Fields";
import Items from "../Items/components/Items";
import TestDnd from '../../shared/components/test/test'
import TestFields from "../fields/Fields";


interface TestTabProps {
    title: string,
    Component: () => JSX.Element
}

const TABS: TestTabProps[] = [
    {
        title: "Items",
        Component: Items
    },
    {
        title: "Chat",
        Component: Chat
    },
    {
        title: "Settings",
        Component: Settings
    },
    // {
    //     title: "Custom ID",
    //     Component: CustomID
    // },
    {
        title: "Fields",
        Component: TestFields
    },
    {
        title: "Access",
        Component: Access
    },
    {
        title: "Stats",
        Component: Stats
    },
    {
        title: "Export",
        Component: Export
    },
]

export default TABS