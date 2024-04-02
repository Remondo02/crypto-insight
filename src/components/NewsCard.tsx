import { Link } from "react-router-dom"
import moment from "moment"
import parse from "html-react-parser"
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  useTheme,
} from "@mui/material"
import { tokens } from "../theme.js"

import placeholderImage from "./../assets/images/cryptonews.jpg"
import { PropsWithChildren, ReactNode } from "react"

import { type NewsValueReponse } from "@/apis"

interface NewsCardProps extends NewsValueReponse {
  title: string
  simplified: boolean
}

type NewsCardWrapperProps = PropsWithChildren<{
  url: string
  children: ReactNode
}>

function NewsCardWrapper({ url, children }: NewsCardWrapperProps) {
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      {url ? (
        <Link
          to={url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </Grid>
  )
}

export default function NewsCard({
  title,
  url,
  image,
  description,
  provider,
  datePublished,
  simplified,
}: NewsCardProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <NewsCardWrapper url={url}>
      <Card
        sx={{
          backgroundColor: colors.primary[400],
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image?.contentUrl || placeholderImage}
            alt={title ? title.replace(/(<([^>]+)>)/gi, "") : ""}
            loading="lazy"
          />
          <CardContent>
            {title && (
              <Typography
                gutterBottom
                variant="h4"
                component={simplified ? "h4" : "h3"}
                color={colors.grey[100]}
                sx={{ marginRight: 1 }}
              >
                {parse(title)}
              </Typography>
            )}
            {description && (
              <Typography variant="body1" color="text.secondary">
                {description.length > 100
                  ? parse(`${description.substring(0, 100)} ...`)
                  : parse(description)}
              </Typography>
            )}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap={1}>
                {provider[0]?.image?.thumbnail?.contentUrl && (
                  <Avatar
                    alt={provider[0]?.name}
                    src={provider[0].image.thumbnail.contentUrl}
                  />
                )}
                {provider[0]?.name && (
                  <Typography variant="body2" color={colors.grey[100]}>
                    {parse(provider[0].name)}
                  </Typography>
                )}
              </Box>
              {datePublished && (
                <Typography variant="body2" color={colors.grey[100]}>
                  {moment(datePublished).startOf("s").fromNow()}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </NewsCardWrapper>
  )
}
