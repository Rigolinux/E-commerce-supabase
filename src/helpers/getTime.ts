function getCurrentDateAndTime(): { date: string; time: string } {
    const currentDate = new Date();
  
    // Get date components
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(currentDate.getFullYear());
  
    // Get time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
    // Build formatted date and time strings
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return { date: formattedDate, time: formattedTime };
  }

export default getCurrentDateAndTime;