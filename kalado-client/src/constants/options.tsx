import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaEllipsisH, FaUtensils, FaUser, FaAd, FaHistory } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const OptionsComponent = () => {
    const { t } = useTranslation();

    const product_categories = [
        { value: 'Real estate', title: t("category.one"), icon: <FaHome /> },
        { value: 'Transportation', title: t("category.two"), icon: <FaCar /> },
        { value: 'House and Kitchen', title: t("category.three"), icon: <FaUtensils /> },
        { value: 'Digital Stuff', title: t("category.four"), icon: <FaLaptop /> },
        { value: 'Entertainment', title: t("category.five"), icon: <FaGamepad /> },
        { value: 'Personal Stuff', title: t("category.six"), icon: <FaSuitcase /> },
        { value: 'Others', title: t("category.seven"), icon: <FaEllipsisH /> },
    ];

    const user_dashboard_menu = [
        { value: 'Profile Management', title: t("dashboard.user.menu.one"), icon: <FaUser /> },
        { value: 'Ads Management', title: t("dashboard.user.menu.two"), icon: <FaAd /> },
    ];

    const admin_dashboard_menu = [
        { value: 'Profile Management', title: t("dashboard.admin.menu.one"), icon: <FaUser /> },
        { value: 'Users Management', title: t("dashboard.admin.menu.two"), icon: <FaAd /> },
        { value: 'Report History', title: t("dashboard.admin.menu.three"), icon: <FaHistory /> },
    ];

    const report_options = [
        { value: 'Abuse', title: t("report.category.one") },
        { value: 'Inproper Content', title: t("report.category.two") },
        { value: 'Inproper Price', title: t("report.category.three") },
        { value: 'Others', title: t("report.category.four") },
    ];

    const search_options = [
        t("search.option1"),
        t("search.option2"),
        t("search.option3"),
        t("search.option4"),
        t("search.option5"),
        t("search.option6"),
        t("search.option7"),
        t("search.option8"),
        t("search.option9"),
        t("search.option10"),
    ];

    const date_filter_options = [
        { title: t('filter.one_day'), value: '1D' },
        { title: t('filter.one_week'), value: '1W' },
        { title: t('filter.one_month'), value: '1M' },
    ];

    return { product_categories, user_dashboard_menu, admin_dashboard_menu, report_options, search_options, date_filter_options };
};
