import requests

urlAuth = "https://toast-api-server/authentication/v1/authentication/login"
url = "https://toast-api-server/stock/v1/inventory"

query = {
  "status": "string"
}

headersAuth = {
  "clientId": "myToastApiClientIdentifier",
  "clientSecret": "",
  "userAccessType": "TOAST_MACHINE_CLIENT"
}

response = requests.get(urlAuth, headers=headersAuth)

if response.status_code == 200:
    token = response.json().get("accessToken") 
    print(f"Token obtained: {token}")
else:
    print(f"Failed to login: {response.status_code}")

headers = {
  "Toast-Restaurant-External-ID": "",
  "Authorization": f"Bearer {token}"
}
response = requests.get(url, headers=headers, params=query)

data = response.json()
print(data)