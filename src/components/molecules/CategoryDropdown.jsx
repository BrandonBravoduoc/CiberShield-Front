import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from '../../services/product/CategoryService';

const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error cargando categorías:", error);
                setCategories([
                    { id: 1, categoryName: "Computadores" },
                    { id: 2, categoryName: "Componentes" },
                    { id: 3, categoryName: "Periféricos" },
                    { id: 4, categoryName: "Monitores" }
                ]);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center gap-2 text-gray-200 hover:text-indigo-400 transition-colors font-semibold text-sm py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Categorías
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-lg border-t-4 border-indigo-500 z-50 animate-fade-in-down">
                    <div className="py-2">

                        <div className="px-4 py-2 border-b border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Todas las categorías</span>
                        </div>

                        <ul className="flex flex-col">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        to={`/?search=${encodeURIComponent(cat.categoryName)}`} 
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                    >
                                        {cat.categoryName}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;