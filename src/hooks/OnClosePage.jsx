
const TokenManagement = () => {
 
    const removeTokenOnUnload = (event) => {
      if (event && event.persisted) {
        return;
      }
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
      }
    };

    window.addEventListener('beforeunload', removeTokenOnUnload);

    return () => {
      window.removeEventListener('beforeunload', removeTokenOnUnload);
    };
  };


export default TokenManagement;