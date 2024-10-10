import { useConfig } from '../auth'
import { redirectToProvider } from '../lib/allauth'
import Button from '../components/Button'

export default function ProviderList(props) {
  const config = useConfig()
  // providers: array of third-party providers.
  const providers = config.data.socialaccount.providers
  if (!providers.length) {
    return null;
  }
  return (
    <>
      <ul>
        {providers.map(provider => {
          return (
            <li key={provider.id}>
              <Button onClick={() => redirectToProvider(provider.id, props.callbackURL, props.process)}>{provider.name}</Button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
