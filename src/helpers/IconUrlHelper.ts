export const RSIconUrl = {
    ATTACK: "https://runescape.wiki/images/thumb/Attack-icon.png/21px-Attack-icon.png?93d2b",
    STRENGTH: "https://runescape.wiki/images/thumb/Strength-icon.png/21px-Strength-icon.png?4b0ac",
    DEFENCE: "https://runescape.wiki/images/thumb/Defence-icon.png/21px-Defence-icon.png?8d986",
    RANGED: "https://runescape.wiki/images/thumb/Ranged-icon.png/21px-Ranged-icon.png?310aa",
    NECROMANCY: "https://runescape.wiki/images/thumb/Necromancy-icon.png/21px-Necromancy-icon.png?f826b",
    MAGIC: "https://runescape.wiki/images/thumb/Magic-icon.png/21px-Magic-icon.png?60d6d",
    PRAYER: "https://runescape.wiki/images/Prayer-icon.png?933f9",
    CONSTITUTION: "https://runescape.wiki/images/thumb/Constitution-icon.png/21px-Constitution-icon.png?bbf9a",
    HERBLORE: "https://runescape.wiki/images/Herblore-icon.png?b0a5b",
    INVENTION: "https://runescape.wiki/images/Invention-icon.png?c4f3d",
    SUMMONING: "https://runescape.wiki/images/Summoning-icon.png?3f7a6",

    QUEST: "https://runescape.wiki/images/thumb/Quest.png/21px-Quest.png?d403d",
    ACHIEVEMENTS: "https://runescape.wiki/images/Task_icon.png?fed7b",
    COMBAT: "https://runescape.wiki/images/Combat_icon_large.png?be4a3",
    LEVELS: "https://runescape.wiki/images/thumb/Statistics.png/21px-Statistics.png?ad17c",
    CAPE: "https://runescape.wiki/images/Igneous_Kal-Zuk.png?21cb9",
    CUSTOM: "https://runescape.wiki/images/Provoke.png?7fa4a"
};
export function RSIconUrlForOrderType(type: string) {
    switch(type.toUpperCase()) {
        case "QUEST": return RSIconUrl.QUEST;
        case "ACHIEVEMENTS": return RSIconUrl.ACHIEVEMENTS;
        case "PVM": return RSIconUrl.COMBAT;
        case "LEVELING": return RSIconUrl.LEVELS;
        case "CAPE_SERVICE": return RSIconUrl.CAPE;
    }
};
export function OrderTypeNameByType(type: string) {
    switch(type.toUpperCase()) {
        case "QUEST": return "Questing";
        case "ACHIEVEMENTS": return "Achievements";
        case "PVM": return "PVM";
        case "LEVELING": return "Leveling";
        case "CAPE_SERVICE": return "Cape Service";
    }
}
export function StatusByStatusID(type: string) {
    switch(type.toUpperCase()) {
        case "REQUESTING_BOOST": return "Requested";
        case "PAYMENT_PENDING": return "Payment Pending";
        case "PAYMENT_FAILED": return "Payment Failed";
        case "PENDING": return "Pending";
        case "IN_PROGRESS": return "In Progress";
        case "COMPLETED": return "Completed";
        case "CANCELLED_BY_CUSTOMER": return "Cancelled";
        case "REFUNDED": return "Refunded";
        case "REFUND_REQUESTED": return "Refund Requested";
        case "PAUSED": return "Paused";
    }
}