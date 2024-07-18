export const LoadingSpinner = () => (
  <div role="status">
    <svg
      id="diceLoader"
      className="w-44 h-44"
      data-name="5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 133.85 155.44"
    >
      <title>Dado</title>
      <polygon
        className="animate-loadingSpinner animate-delay-[1.2s]"
        points="66.92 154.13 131.55 116.12 66.92 108.51 66.92 154.13"
        style={{
          fill: "#446075",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
          fillRule: "evenodd",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[1.2s]"
        points="66.92 154.13 66.92 108.51 2.3 116.12 66.92 154.13"
        style={{
          fill: "#40749b",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[1.8s]"
        points="2.3 116.12 36.51 55.3 2.3 40.09 2.3 116.12"
        style={{
          fill: "#255780",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
          fillRule: "evenodd",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[1.8s]"
        points="36.51 55.3 2.3 40.09 66.92 2.08 36.51 55.3"
        style={{
          fill: "#40749b",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[2.4s]"
        points="97.33 55.3 131.55 40.09 66.92 2.08 97.33 55.3"
        style={{
          fill: "#2da1c4",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[2.4s]"
        points="97.33 55.3 131.55 116.12 131.55 40.09 97.33 55.3"
        style={{
          fill: "#0e6d8a",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
          fillRule: "evenodd",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[.6s]"
        points="66.92 108.51 131.55 116.12 97.33 55.3 66.92 108.51"
        style={{
          fill: "#5e9cbf",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[.6s]"
        points="36.51 55.3 2.3 116.12 66.92 108.51 36.51 55.3"
        style={{
          fill: "#6ab0d8",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
        }}
      />
      <polygon
        className="animate-loadingSpinner animate-delay-[.6s]"
        points="36.51 55.3 66.92 2.08 97.33 55.3 36.51 55.3"
        style={{
          fill: "#6ab0d8",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
        }}
      />
      <polygon
        className="animate-loadingSpinner"
        points="66.92 108.51 97.33 55.3 36.51 55.3 66.92 108.51"
        style={{
          fill: "#9fe1ee",
          stroke: "#fff",
          strokeMiterlimit: 10,
          strokeWidth: "1.5px",
          fillRule: "evenodd",
        }}
      />
    </svg>
    <span className="sr-only text-zinc-900 z-20">Carregando...</span>
  </div>
);
