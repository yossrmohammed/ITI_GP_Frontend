

const Toast = ({ showToast, toastType, toastMessage }) => (
    showToast && (
        <div className="fixed bottom-0 right-0 m-4">
            <div className={`alert ${toastType === 'success' ? 'alert-success' : 'alert-error'} shadow-lg`}>
                <div>
                    <span>{toastMessage}</span>
                </div>
            </div>
        </div>
    )
);

export default Toast;
