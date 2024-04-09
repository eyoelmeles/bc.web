import AspectRatio, { AspectRatioProps } from "@mui/joy/AspectRatio";

export default function BuildConnectLogo({ sx, ...props }: AspectRatioProps) {
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...props}
      sx={[
        {
          width: "4rem",
          //   borderRadius: "sm",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        <img src="/build_connect.png" />
      </div>
    </AspectRatio>
  );
}
