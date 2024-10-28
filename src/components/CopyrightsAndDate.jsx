function CopyrightsAndDate({ release_date, copyrights }) {
    const [year, month, day] = release_date.split("-");
    const monthInNumber = Number(month);
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const monthText = monthInNumber && monthInNumber > 0 && monthInNumber <= 12
      ? months[monthInNumber - 1]
      : "Unknown Month"; 
    
    return (
      <section className="w-full text-gray-300 pt-6  px-[2.5%] flex gap-2 flex-col">
        <p className="font-semibold text-base">{` ${monthText} ${day || "Unknown Day"}, ${year || "Unknown Year"}`}</p>
        {copyrights.length > 0 && <>
        {copyrights.map((copyright, index) => {
            return <p key={index} className="text-xs">&copy; {copyright?.text}</p>
        })}
        </>}
      </section>
    );
  }
  
  export default CopyrightsAndDate;
  