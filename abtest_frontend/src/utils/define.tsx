import React from 'react';
import { 
    ABTestHomeIcons,
    ABTestCreateIcons,
    ABTestInterpretIcons,
    ABTestExploreIcons,
    ABTestSizeIcons,
    ABTestMetricsIcons
} from "@/components/icons/icons"

export const MenuContent = [
    {
        name: 'Home',
        link: '/',
        disabled: false,
        icon: <ABTestHomeIcons/>
    },
    {
        name: 'Create A/B Testing',
        link: '/create_ab_testing',
        disabled: false,
        icon: <ABTestCreateIcons/>
    },
    {
        name: 'Interpreting A/B Testing',
        link: '/interpret_ab_testing',
        disabled: false,
        icon: <ABTestInterpretIcons/>
    },
    {
        name: 'Exploring Metrics',
        link: '/explore_metrics',
        disabled: true,
        icon: <ABTestExploreIcons/>
    },
    {
        name: 'Sample Size Calculator',
        link: '/sample_size_calculator',
        disabled: true,
        icon: <ABTestSizeIcons/>
    },
    {
        name: 'Metrics',
        link: '/metrics',
        disabled: false,
        icon: <ABTestMetricsIcons/>
    }
]