import { Doughnut } from "react-chartjs-2";

const optionsGauge = {
  aspectRatio: 2,
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    datalabels: {
      display: false,
    },
  },
};

export default function PosicaoAr({ data }: { data: any }) {
  return (
    <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">Posição Da Válvula</h2>
      <div className="w-80 h-52 flex flex-col items-center justify-center">
        <Doughnut className="mt-1" data={data} options={optionsGauge} />
        <span className="font-bold text-4xl -mt-10">
          {data.datasets[0].data[0]}%
        </span>
      </div>
    </div>
  );
}
