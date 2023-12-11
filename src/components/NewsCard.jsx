import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  useTheme,
} from "@mui/material"

import { Link } from "react-router-dom"
import { tokens } from "../theme.js"
import moment from "moment"

function NewsCardWrapper({ url, children }) {
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
        { children }
      )}
    </Grid>
  )
}

export function NewsCard({
  title,
  url,
  urlToImage,
  description,
  author,
  publishedAt,
}) {
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
          {urlToImage && (
            <CardMedia
              component="img"
              height="140"
              image={urlToImage}
              alt={title ?? ""}
            />
          )}
          <CardContent>
            {title && (
              <Typography gutterBottom variant="h4" color={colors.grey[100]}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body1" color="text.secondary">
                {description.length > 100
                  ? `${description.substring(0, 100)} ...`
                  : description}
              </Typography>
            )}
            <Box mt={2} display="flex" justifyContent="space-between">
              {author && (
                <Typography variant="body2" color={colors.grey[100]}>
                  {author}
                </Typography>
              )}
              {publishedAt && (
                <Typography variant="body2" color={colors.grey[100]}>
                  {moment(publishedAt).startOf("ss").fromNow()}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </NewsCardWrapper>
  )
}
