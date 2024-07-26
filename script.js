setTimeout(() => {
    document.querySelector('form').submit();
}, <%= timeLimit * 1000 %>);
