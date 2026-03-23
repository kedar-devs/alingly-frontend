type InfoCardProps = {
    title: string;
    titleCss?: string;
    info: number;
    infoCss?: string;
}
function InfoCard({ title, info, titleCss="", infoCss="" }: InfoCardProps) {
  return (
    <div className=" border rounded-2xl p-5 w-64 h-28 flex flex-col gap-y-2">
      <h2 className={`text-xl font-bold ${titleCss} `}>{title}</h2>
      <p className={`text-4xl font-extrabold ${infoCss}`}>{info>10? info : '0'+info}</p>
    </div>
  )
}

export default InfoCard
