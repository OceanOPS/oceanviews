import { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import config from '../config';

interface SearchPageProps {
  searchText: string;
}

interface Result {
  item: string;
  itemType: string;
  id: number;
  extra?: string;
  status?: string;
  value?: string;
}

type GroupedResults = { [key: string]: Result[] };

const SearchPage: React.FC<SearchPageProps> = ({ searchText }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [groupedResults, setGroupedResults] = useState<{ [key: string]: Result[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pluralizeItemType = (itemType: string) => {
    const typesToPluralize = ["platform", "contact", "site", "ship", "cruise", "group"];
    return typesToPluralize.includes(itemType.toLowerCase()) ? `${itemType}s` : itemType;
  };

  const highlightMatch = (text: string) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  const parseFilterName = (itemHtml: string): string => {
    const match = itemHtml.match(/<span[^>]*>[^<]*<\/span>.*?<span[^>]*>([^<]*)<\/span>/);
    return match ? match[1] : "Unknown Filter";
  };

  const specialResults = [
    { name: "Distribution Pie chart", description: "Display chart" },
    { name: "Deployments Timeline", description: "Display chart" },
    { name: "Instrumentation dashboard", description: "Display dashboard" },
    { name: "Summary dashboard", description: "Display dashboard" },
    { name: "Instrumentation dashboard", description: "Display dashboard" },
    { name: "Select and manage metadata", description: "Display Platforms" },
  ];

  useEffect(() => {
    if (searchText.length < 3) {
      setResults([]);
      setGroupedResults({});
      setError("Please type at least 3 characters");
      return;
    }

    setError(null);
    setLoading(true);

    fetch(`${config.oldDashboardApiRoot}/SearchSiteList?searchSite=${encodeURIComponent(searchText)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching results");
        setLoading(false);
      });
  }, [searchText]);

  useEffect(() => {
	if (Array.isArray(results)) {  // Ensure `results` is an array
	  const grouped: GroupedResults = results.reduce((acc, result) => {
		(acc[result.itemType] = acc[result.itemType] || []).push(result);
		return acc;
	  }, {} as GroupedResults);
	  setGroupedResults(grouped);
	} else {
	  console.error("Expected `results` to be an array but got", results);
	}
  }, [results]);

  return (
    <Box sx={{ padding: 9 }}>
      <Typography variant="h4">Search results for "{searchText}"</Typography>
      
      {searchText.length < 3 ? (
        <Typography>Please type at least 3 characters</Typography>
      ) : loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : results.length > 0 ? (
        <Grid container spacing={3}>
          {Object.keys(groupedResults).map((itemType) => {
            const isFilterByType = itemType.includes("Filter by");
            const title = isFilterByType
              ? `${itemType.trim().replace("Filter", "Filtered")}: ${parseFilterName(groupedResults[itemType][0].item)}`
              : pluralizeItemType(itemType);

            return (
              <Grid item xs={12} sm={6} md={4} key={itemType}>
                <Typography variant="h6" sx={{ marginBottom: 1, color: "#03a9f4", marginTop: 3 }}>
                  {title}
                </Typography>
                {isFilterByType
                  ? specialResults.map((result, index) => (
                      <Box
                        key={index}
                        sx={{
                          marginBottom: 0,
                          padding: 1.5,
						  border: '1px solid transparent',
                          cursor: 'pointer',
                          '&:hover': {
                            border: '1px solid #ddd',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                            borderRadius: '4px',
                          },
                        }}
                        onClick={() => console.log(`Clicked on ${result.name}`)}
                      >
                        <Typography variant="body1">{result.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875em' }}>
                          {`${result.description} ${title}`}
                        </Typography>
                      </Box>
                    ))
                  : groupedResults[itemType]
                      .slice(0, 10) // Limit to 10 results per category
                      .map((result) => (
                        <Box
                          key={result.id}
                          sx={{
                            marginBottom: 0,
                            padding: 1.5,
							border: '1px solid transparent',
                            cursor: 'pointer',
                            '&:hover': {
                              border: '1px solid #ddd',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                              borderRadius: '4px',
                            },
                          }}
                          onClick={() => console.log(`Clicked on ${result.item}`)}
                        >
                          <Typography variant="body1">
                            {highlightMatch(result.item)}
                          </Typography>
                          {result.itemType.toLowerCase() === 'platform' && (
                            <Box sx={{ fontSize: '0.875em', color: 'text.secondary' }}>
                              <Typography variant="body2">{highlightMatch(result.extra || '')}</Typography>
                              <Typography variant="body2">{result.status}</Typography>
                            </Box>
                          )}
                        </Box>
                      ))}
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography>No results found</Typography>
      )}
    </Box>
  );
};

export default SearchPage;
