import { toast } from 'react-toastify';

export const showToast = (message, options = {}) => {
    const toastClasses = 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm dark:text-gray-300';
    toast(<div dangerouslySetInnerHTML={{__html: message}} />, {
        ...options,
        className: toastClasses,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
    });
};

export const showErrorToast = (err) => {
    const errs = Object.values(err);
    if ( ! errs) return;
    showToast(errs[0] + (errs?.length > 1 ? `
        <br />
        <span class="text-sm font-semibold">
            +${errs.length - 1} other error${errs.length > 2 ? 's' : ''}
        </span>
    ` : ''), { type: 'error' });
};

export const showSuccessToast = (message) => {
    showToast((message.props?.flash.success || 'Succeeded'), { type: 'success' });
};
