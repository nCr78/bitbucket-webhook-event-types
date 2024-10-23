// Type definitions for Bitbucket Cloud Webhooks
// https://support.atlassian.com/bitbucket-cloud/docs/event-payloads

export namespace Bitbucket {
  // Shared Interfaces
  interface User {
    uuid: string;
    display_name: string;
    account_id: string;
    nickname: string;
    type: string;
    links: {
      self: Link;
      html: Link;
      avatar: Link;
    };
  }

  interface Link {
    href: string;
  }

  interface Project {
    key: string;
    uuid: string;
    name: string;
    type: string;
    links: {
      html: Link;
      avatar: Link;
    };
  }

  interface Repository {
    name: string;
    uuid: string;
    full_name: string;
    type: string;
    is_private: boolean;
    scm: string;
    website: string | null;
    owner: User;
    project: Project;
    links: {
      self: Link;
      html: Link;
      avatar: Link;
    };
  }

  interface PullRequest {
    id: number;
    title: string;
    description: string;
    state: string;
    author: User;
    destination: Branch;
    source: Branch;
    links: {
      self: Link;
      html: Link;
    };
  }

  interface Branch {
    name: string;
    repository: Repository;
  }

  interface CommitAuthor {
    raw: string;
    user?: User;
  }

  interface Commit {
    hash: string;
    type: string;
    message: string;
    author: CommitAuthor;
    date: string;
    parents: Array<{
      hash: string;
      links: {
        self: Link;
        html: Link;
      };
    }>;
    links: {
      self: Link;
      html: Link;
    };
  }

  // Event Payloads
  namespace WebhookEvents {
    interface RepositoryPush {
      actor: User;
      repository: Repository;
      push: {
        changes: Change[];
      };
    }

    interface Change {
      new?: Reference;
      old?: Reference;
      created: boolean;
      closed: boolean;
      forced: boolean;
      commits?: Commit[];
      truncated?: boolean;
    }

    interface Reference {
      type: string;
      name: string;
      target: Commit;
      links: {
        self: Link;
        commits: Link;
        html: Link;
      };
    }

    interface PullRequestCreated {
      actor: User;
      repository: Repository;
      pullrequest: PullRequest;
    }

    interface PullRequestUpdated {
      actor: User;
      repository: Repository;
      pullrequest: PullRequest;
    }

    interface PullRequestMerged {
      actor: User;
      repository: Repository;
      pullrequest: PullRequest;
    }

    interface PullRequestDeclined {
      actor: User;
      repository: Repository;
      pullrequest: PullRequest;
    }

    interface RepositoryFork {
      actor: User;
      repository: Repository;
      fork: Repository;
    }

    interface RepositoryUpdated {
      actor: User;
      repository: Repository;
      changes: RepositoryChange[];
    }

    interface RepositoryChange {
      field: string;
      old: string | null;
      new: string | null;
    }
  }
}

// Event Key Enumeration
export type BitbucketEventKeys = 'repo:push'
| 'pullrequest:created'
| 'pullrequest:updated'
| 'pullrequest:merged'
| 'pullrequest:declined'
| 'repo:fork'
| 'repo:updated';
