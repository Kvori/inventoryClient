import Chat from "../chat/Chat";
import Stats from "../chat/Chat";
import Access from "../access/Access";
import CustomID from "../customID/CustomId";
import Export from "../export/Export";
import { JSX } from "react";
import Settings from "../settings/Settings";
import Fields from "../fields/Fields";
import Items from "../Items/components/Items";
import TestFields from "../fields/Fields";


interface TabProps {
    title: string,
    Component: () => JSX.Element
}

export const Tabs_default: TabProps[] = [
    {
        title: "Items",
        Component: Items
    },
    {
        title: "Chat",
        Component: Chat
    }
]


export const Tabs_owner: TabProps[] = [
    {
        title: "Settings",
        Component: Settings
    },
    {
        title: "Custom ID",
        Component: CustomID
    },
    {
        title: "Fields",
        Component: Fields
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
