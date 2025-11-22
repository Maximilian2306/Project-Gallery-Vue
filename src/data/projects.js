export const categories = [
    {
        id: 'games',
        icon: 'gamepad',
        titleKey: 'games',
        countKey: 'games-count',
        gradient: 'game-pattern'
    },
    {
        id: 'tools',
        icon: 'tools',
        titleKey: 'tools',
        countKey: 'tools-count',
        gradient: 'tool-pattern'
    },
    {
        id: 'services',
        icon: 'cloud',
        titleKey: 'services',
        countKey: 'services-count',
        gradient: 'service-pattern'
    }
]

export const projects = [
    // Games
    {
        id: 1,
        category: 'games',
        title: 'Minesweeper_AI_optimized',
        descriptionKey: 'space-desc',
        icon: 'rocket',
        tech: ['JavaScript', 'HTML5', 'WebGL'],
        demoLink: 'https://maximilian2306.github.io/Minesweeper_AI_v2/',
        codeLink: 'https://github.com/Maximilian2306/Minesweeper_AI_v2'
    },
    {
        id: 2,
        category: 'games',
        title: 'FlyTillYouDieDepot',
        descriptionKey: 'memory-desc',
        icon: 'puzzle-piece',
        tech: ['C#', 'WPF', 'XAML', 'SQL'],
        demoLink: '#',
        codeLink: 'https://github.com/Maximilian2306/FlyTilYouDieDepot'
    },
    {
        id: 3,
        category: 'games',
        title: 'Minesweeper_AI',
        descriptionKey: 'space-desc',
        icon: 'rocket',
        tech: ['JavaScript', 'HTML5', 'WebGL'],
        demoLink: 'https://maximilian2306.github.io/Minesweeper_AI/',
        codeLink: 'https://github.com/Maximilian2306/Minesweeper_AI'
    },
    // Tools
    {
        id: 4,
        category: 'tools',
        title: 'ClickMAX',
        descriptionKey: 'formatter-desc',
        icon: 'code',
        tech: ['Python', 'Tkinter', 'PyAutoGUI'],
        demoLink: 'https://github.com/Maximilian2306/Auto-Clicker/releases/tag/ClickMAX',
        codeLink: 'https://github.com/Maximilian2306/Auto-Clicker'
    }
]

// Helper function to get all unique technologies
export const getAllTechnologies = () => {
    const techSet = new Set()
    projects.forEach(project => {
        project.tech.forEach(t => techSet.add(t))
    })
    return Array.from(techSet).sort()
}

// Technology categories for filtering
export const techCategories = {
    languages: {
        titleKey: 'filter-languages',
        icon: 'code',
        items: ['JavaScript', 'Python', 'C#']
    },
    frameworks: {
        titleKey: 'filter-frameworks',
        icon: 'layer-group',
        items: ['WPF', 'Tkinter', 'PyAutoGUI']
    },
    technologies: {
        titleKey: 'filter-technologies',
        icon: 'microchip',
        items: ['HTML5', 'WebGL', 'XAML', 'SQL']
    }
}

// Helper function to get project count by category
export const getProjectCountByCategory = (categoryId) => {
    return projects.filter(p => p.category === categoryId).length
}
