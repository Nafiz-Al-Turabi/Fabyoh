import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { MdAdminPanelSettings } from 'react-icons/md';
import { PiUsersThreeLight } from 'react-icons/pi';
import { FaTrashAlt } from 'react-icons/fa';

const ManagesRoleTable = ({ admin, handleUserDelete, toggleRole, loadingRoleUpdate }) => {
    const { user } = useContext(AuthContext)
    let textColor
    let textShadow
    switch (admin.role) {
        case 'admin':
            textColor = 'text-xs capitalize p-text font-bold';
            textShadow = '[text-shadow:1px_1px_2px_#7a33ffb0]';
            break;
        case 'super-admin':
            textColor = 'text-xs capitalize text-red-500 font-bold';
            textShadow = '[text-shadow:1px_1px_2px_#ff0000ad]';
            break;
        default:
            textColor = 'text-xs capitalize text-green-500 font-bold';
            textShadow = 'text-shadow:1px_1px_2px_#00fc0d]';
    }
    return (
        <tr key={admin._id} className="hover:bg-gray-50 border-b transition-colors duration-300">
            <td className="px-4 py-2 md:px-6 md:py-4 flex items-center space-x-2 text-sm">
                <img
                    src={admin.image || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className='p-text'>{admin.name}</p>
                    <p className='s-text'>{admin.email}</p>
                </div>
            </td>
            <td className="px-4 py-2 md:px-6 md:py-4">
                <p className={`text-xs capitalize ${textColor} ${textShadow}`}>{admin.role}</p>
            </td>
            {
                user.role === 'super-admin' ?
                    <td className="px-4 py-2 md:px-6 md:py-4">
                        {
                            admin.role !== 'super-admin' && (
                                <button
                                    onClick={() => toggleRole(admin._id, admin.role)}
                                    disabled={loadingRoleUpdate}
                                    className='flex justify-center items-center p-text border px-10 py-2 border-violet-500 hover:bg-violet-500 hover:text-white hover:shadow-xl hover:shadow-violet-600/50 active:scale-90 duration-200 ease-in rounded'>
                                    {admin.role === 'admin' ? (
                                        <MdAdminPanelSettings />
                                    ) : (
                                        <PiUsersThreeLight />
                                    )}
                                </button>
                            )
                        }

                    </td>
                    : ''
            }
            <td className="px-4 py-2 md:px-6 md:py-4 flex items-center space-x-2">
                {admin.role !== 'super-admin' && (
                    <button
                        onClick={() => handleUserDelete(admin._id)}
                        className="flex items-center text-red-500 p-2 border border-red-500 hover:bg-red-500 hover:text-white hover:shadow-xl hover:shadow-red-600/50 active:scale-90 duration-200 ease-in rounded"
                    >
                        <FaTrashAlt />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default ManagesRoleTable;